import { ENV, generateOTP, OTP_MESSAGE, sendEmail, ValidationError } from "@org/shared";
import { IEmailService } from '../interfaces/email.interface.js';
import { redis } from "../redis.js";

/**
 * Email Service Implementation using Redis
 */
export class EmailService implements IEmailService {
    constructor() { }

    async sendOtpToEmail(to: string, templateName: string): Promise<void> {
        const otp = generateOTP();
        const otpExpired = Number(ENV.OTP_EXPIRED);

        // Check cooldown
        if (await redis.get(`otp_cooldown:${to}`)) {
            throw new ValidationError(OTP_MESSAGE.COOLDOWN);
        }

        // Send email
        await sendEmail(
            to,
            "Xác thực Email của Bạn!",
            "Xác thực Email",
            templateName,
            { otp, otpExpired: otpExpired / 60 }
        );

        // Store OTP in Redis with expiration
        const p = redis.pipeline();
        p.set(`otp:${to}`, otp, { ex: otpExpired });
        p.set(`otp_cooldown:${to}`, "true", { ex: Number(ENV.OTP_COOLDOWN) });
        await p.exec();
    }
}
