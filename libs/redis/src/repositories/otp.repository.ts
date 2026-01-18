import { redis } from "../redis"
import { IOtpService } from "../interfaces/otp.interface"
import { ValidationError } from "@org/shared"
import { OTP_MESSAGE } from "@org/shared"
import { ENV } from "@org/shared"

export class OtpService implements IOtpService {
    constructor() {}
    async findOtpByEmail(to: string): Promise<{otp: string | null}> {
        const otp =  await redis.get(`otp:${to}`)
        return {otp: otp as string | null}
    }

        async checkOtpRestrictions(email: string) {
        if (await redis.get(`otp_locked:${email}`)) {
            throw new ValidationError(OTP_MESSAGE.LOCKED)
        }
    }

    async handleFailedAttempts(email: string) {
        await this.checkOtpRestrictions(email)

        const attemptsKey = `otp_attempts:${email}`
        const lockKey = `otp_locked:${email}`
        const maxAttempts = Number(ENV.OTP_MAX_ATTEMPTS)

        const currentAttempts = await redis.incr(attemptsKey)

        if (currentAttempts === 1) {
            await redis.expire(attemptsKey, Number(ENV.OTP_EXPIRED))
        }

        if (currentAttempts > maxAttempts) {
            await redis.set(lockKey, "true", {ex: Number(ENV.OTP_LOCKTIME)})
            await redis.del(attemptsKey)
            throw new ValidationError(OTP_MESSAGE.LOCKED)
        }

        const remainingAttempts = maxAttempts - currentAttempts
        throw new ValidationError(OTP_MESSAGE.INVALID, {remainingAttempts})
    }

    resetOTP = async (to: string): Promise<void> => {
        await redis.del(`otp:${to}`)
        await redis.del(`otp_attempts:${to}`)
    }
    
}