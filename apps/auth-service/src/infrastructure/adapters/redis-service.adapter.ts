import { EmailService, OtpService } from "@org/redis";
import { IEmailService, IOtpService } from "../../application/ports/index.js";

/**
 * Adapter for Email Service
 * Adapts @org/redis EmailService to application's IEmailService port
 */
export class RedisEmailServiceAdapter implements IEmailService {
    private emailService: EmailService;

    constructor() {
        this.emailService = new EmailService();
    }

    async sendOtpToEmail(email: string, template: string): Promise<void> {
        await this.emailService.sendOtpToEmail(email, template);
    }
}

/**
 * Adapter for OTP Service
 * Adapts @org/redis OtpService to application's IOtpService port
 */
export class RedisOtpServiceAdapter implements IOtpService {
    private otpService: OtpService;

    constructor() {
        this.otpService = new OtpService();
    }

    async checkOtpRestrictions(email: string): Promise<void> {
        await this.otpService.checkOtpRestrictions(email);
    }

    async findOtpByEmail(email: string): Promise<{ otp: string | null }> {
        return this.otpService.findOtpByEmail(email);
    }

    async handleFailedAttempts(email: string): Promise<void> {
        await this.otpService.handleFailedAttempts(email);
    }

    async resetOTP(email: string): Promise<void> {
        await this.otpService.resetOTP(email);
    }
}
