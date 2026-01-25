import { EmailService, OtpService } from "@org/redis";
import { IEmailService, IOtpService } from "../../application/services/external.js";


export class RedisEmailService implements IEmailService {
    private emailService: EmailService;

    constructor() {
        this.emailService = new EmailService();
    }

    async sendOtpToEmail(email: string, template: string): Promise<void> {
        await this.emailService.sendOtpToEmail(email, template);
    }
}


export class RedisOtpService implements IOtpService {
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
