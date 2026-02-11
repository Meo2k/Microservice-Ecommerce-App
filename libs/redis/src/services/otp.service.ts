import { redis } from "../redis.js";
import { IOtpService } from "../interfaces/otp.interface.js";
import { Result, ErrorCodes } from "@org/shared";
import { ENV } from "@org/shared/server";
import { ErrorMessages } from "@org/shared";

/**
 * OTP Service Implementation using Redis
 */
export class OtpService implements IOtpService {
    constructor() { }

    async findOtpByEmail(email: string): Promise<{ otp: string | null }> {
        const otp = await redis.get(`otp:${email}`);
        return { otp: otp as string | null };
    }

    async checkOtpRestrictions(email: string): Promise<Result<void>> {
        if (await redis.get(`otp_locked:${email}`)) {
            return Result.fail({
                code: ErrorCodes.ERR_BAD_REQUEST,
                message: ErrorMessages.Otp.OtpLocked,
            });
        }
        return Result.ok();
    }

    async handleFailedAttempts(email: string): Promise<Result<void>> {
        const check = await this.checkOtpRestrictions(email);
        if (!check.isSuccess) return check;

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
            return Result.fail({
                code: ErrorCodes.ERR_BAD_REQUEST,
                message: ErrorMessages.Otp.OtpLocked
            });
        }

        const remainingAttempts = maxAttempts - currentAttempts;
        return Result.fail({
            code: ErrorCodes.ERR_BAD_REQUEST,
            message: `${ErrorMessages.Otp.OtpInvalid}. Remaining attempts: ${remainingAttempts}`
        });
    }

    async resetOTP(email: string): Promise<void> {
        const p = redis.pipeline();
        p.del(`otp:${email}`);
        p.del(`otp_locked:${email}`);
        p.del(`otp_cooldown:${email}`);
        p.del(`otp_attempts:${email}`);
        await p.exec();
    }
}
