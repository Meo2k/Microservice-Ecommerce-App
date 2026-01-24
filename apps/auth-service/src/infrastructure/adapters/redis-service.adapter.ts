import { EmailRepository, OtpRepository } from "@org/redis";
import { IEmailService, IOtpService } from "../../application/ports/index.js";

/**
 * Adapter for Email Service
 * Adapts @org/redis EmailRepository to application's IEmailService port
 */
export class RedisEmailServiceAdapter implements IEmailService {
    private emailRepo: EmailRepository;

    constructor() {
        this.emailRepo = new EmailRepository();
    }

    async sendOtpToEmail(email: string, template: string): Promise<void> {
        await this.emailRepo.sendOtpToEmail(email, template);
    }
}

/**
 * Adapter for OTP Service
 * Adapts @org/redis OtpRepository to application's IOtpService port
 */
export class RedisOtpServiceAdapter implements IOtpService {
    private otpRepo: OtpRepository;

    constructor() {
        this.otpRepo = new OtpRepository();
    }

    async checkOtpRestrictions(email: string): Promise<void> {
        await this.otpRepo.checkOtpRestrictions(email);
    }

    async findOtpByEmail(email: string): Promise<{ otp: string | null }> {
        return this.otpRepo.findOtpByEmail(email);
    }

    async handleFailedAttempts(email: string): Promise<void> {
        await this.otpRepo.handleFailedAttempts(email);
    }

    async resetOTP(email: string): Promise<void> {
        await this.otpRepo.resetOTP(email);
    }
}
