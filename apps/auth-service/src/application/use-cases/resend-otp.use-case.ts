import { Result, SuccessMessages } from "@org/shared";
import { IAuthRepository } from "../repositories/auth.repository.interface.js";
import { IEmailService, IOtpService } from "../services/external.js";
import { ResendOtpCommand } from "@org/shared";
import { UserError } from "../../domain/error.domain.js";

/**
 * Use Case: Resend OTP
 * Resends OTP to user's email
 */
export class ResendOtpUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly emailService: IEmailService,
        private readonly otpService: IOtpService
    ) { }

    async execute(data: ResendOtpCommand): Promise<Result<{ message: string }>> {
        const { email } = data.body;

        // Check OTP restrictions
        const otpCheck = await this.otpService.checkOtpRestrictions(email);
        if (!otpCheck.isSuccess) {
            return Result.fail(otpCheck.error);
        }

        // Find user
        const userResult = await this.authRepo.findUserByEmail(email);
        if (!userResult.isSuccess) {
            return Result.fail(UserError.NotFound);
        }

        // Send new OTP
        const emailResult = await this.emailService.sendOtpToEmail(email, "otp.template");
        if (!emailResult.isSuccess) {
            return Result.fail(emailResult.error);
        }

        return Result.ok({ message: SuccessMessages.Auth.OtpResent });
    }
}

