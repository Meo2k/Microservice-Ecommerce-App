import { redis } from "../redis.js";
import { IOtpRepository } from "../interfaces/otp.interface.js";
import { ValidationError, OTP_MESSAGE, ENV } from "@org/shared";

/**
 * OTP Repository Implementation using Redis
 * Handles OTP data access with business logic for validation and locking
 */
export class OtpRepository implements IOtpRepository {
    constructor() { }

    async findOtpByEmail(email: string): Promise<{ otp: string | null }> {
        const otp = await redis.get(`otp:${email}`);
        return { otp: otp as string | null };
    }

    async checkOtpRestrictions(email: string): Promise<void> {
        if (await redis.get(`otp_locked:${email}`)) {
            throw new ValidationError(OTP_MESSAGE.LOCKED);
        }
    }

    async handleFailedAttempts(email: string): Promise<void> {
        await this.checkOtpRestrictions(email);

        const attemptsKey = `otp_attempts:${email}`;
        const lockKey = `otp_locked:${email}`;
        const maxAttempts = Number(ENV.OTP_MAX_ATTEMPTS);

        const currentAttempts = await redis.incr(attemptsKey);

        if (currentAttempts === 1) {
            await redis.expire(attemptsKey, Number(ENV.OTP_EXPIRED));
        }

        if (currentAttempts > maxAttempts) {
            await redis.set(lockKey, "true", { ex: Number(ENV.OTP_LOCKTIME) });
            await redis.del(attemptsKey);
            throw new ValidationError(OTP_MESSAGE.LOCKED);
        }

        const remainingAttempts = maxAttempts - currentAttempts;
        throw new ValidationError(OTP_MESSAGE.INVALID, { remainingAttempts });
    }

    async resetOTP(email: string): Promise<void> {
        await redis.del(`otp:${email}`);
        await redis.del(`otp_attempts:${email}`);
    }
}
