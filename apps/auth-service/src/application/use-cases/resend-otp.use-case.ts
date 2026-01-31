import { Result, SuccessMessages } from "@org/shared";
import { IAuthRepository } from "../repositories/auth.repository.interface.js";
import { IEmailService, IOtpService } from "../services/external.js";
import { ResendOtpCommand } from "../../api/auth.validator.js";
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
        await this.otpService.checkOtpRestrictions(email);

        // Find user
        const userResult = await this.authRepo.findUserByEmail(email);
        if (!userResult.isSuccess) {
            return Result.fail(UserError.NotFound);
        }

        // Send new OTP
        await this.emailService.sendOtpToEmail(email, "otp.template");

        return Result.ok({ message: SuccessMessages.Auth.OtpResent });
    }
}

