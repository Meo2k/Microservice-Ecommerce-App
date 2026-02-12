
import { ENV } from "@org/shared";
import { IOtpRepository } from "../../application/repositories/otp.repository.interface.js";
import { Otp } from "../../domain/entities/otp.entity.js";
import { redis } from "@org/redis";

export class RedisOtpRepository implements IOtpRepository {
    private readonly PREFIX = "otp:";
    private readonly CD_PREFIX = "otp_cooldown:";
    private readonly ATTEMPT_PREFIX = "otp_attempts:";

    async save(otp: Otp): Promise<void> {
        const key = this.PREFIX + otp.email;
        const ttlSeconds = otp.isLocked 
            ? Number(ENV.OTP_LOCKTIME) 
            : Math.ceil((otp.expiresAt.getTime() - Date.now()) / 1000);

        if (ttlSeconds > 0) {
            const data = JSON.stringify({
                code: otp.code,
                expiresAt: otp.expiresAt.toISOString(),
                isLocked: otp.isLocked,
            });
            await redis.set(key, data, { ex: ttlSeconds });
        }
    }

    async findByEmail(email: string): Promise<Otp | null> {
        const key = this.PREFIX + email;
        const data = await redis.get(key) as string | null;

        if (!data) return null;

        try {
            const parsed = JSON.parse(data) as { code: string; expiresAt: string; attempts?: number; isLocked?: boolean };
            const attempts = await redis.get(this.ATTEMPT_PREFIX + email) as string;

            return new Otp(
                email,
                parsed.code,
                new Date(parsed.expiresAt),
                attempts ? parseInt(attempts) : 0,
                parsed.isLocked || false
            );
        } catch (error) {
            console.error("Error parsing OTP from Redis:", error);
            return null;
        }
    }

    async delete(email: string): Promise<void> {
        const key = this.PREFIX + email;
        await redis.del(key);
    }


    async getCooldownSeconds(email: string): Promise<number> {
        const key = `${this.CD_PREFIX}${email}`;
        return await redis.ttl(key);
    }

    async setCooldown(email: string, seconds: number): Promise<void> {
        const key = `${this.CD_PREFIX}${email}`;
        await redis.set(key, "true", { ex: seconds });
    }

    async incrementAttempts(email: string): Promise<number> {
        const attempts = await redis.incr(`${this.ATTEMPT_PREFIX}${email}`);
        
        if (attempts === 1) {
            await redis.expire(`${this.ATTEMPT_PREFIX}${email}`, Number(ENV.OTP_LOCKTIME));
        }
        
        return attempts;
    }
}
