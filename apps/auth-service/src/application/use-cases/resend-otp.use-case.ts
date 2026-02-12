import { Result, SuccessMessages, ResendOtpCommand, ErrorCodes, ErrorMessages, ENV } from "@org/shared/server";
import { IAuthRepository } from "../repositories/auth.repository.interface.js";
import { IOtpRepository } from "../repositories/otp.repository.interface.js";
import { IAuthMessagePublisher } from "../services/message-publisher.interface.js";
import { Otp } from "../../domain/entities/otp.entity.js";
import { UserError } from "../../domain/error.domain.js";

/**
 * Use Case: Resend OTP
 * Resends OTP to user's email
 */
export class ResendOtpUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly otpRepo: IOtpRepository,
        private readonly messagePublisher: IAuthMessagePublisher
    ) { }

    async execute(data: ResendOtpCommand): Promise<Result<{ message: string }>> {
        const { email } = data.body;

        const otpEntityExists = await this.otpRepo.findByEmail(email);
        if (otpEntityExists && otpEntityExists.isLocked) {
            return Result.fail({
                code: ErrorCodes.ERR_BAD_REQUEST,
                message: ErrorMessages.Otp.OtpLocked
            });
        }

        // Check cooldown
        const cooldown = await this.otpRepo.getCooldownSeconds(email);
        if (cooldown > 0) {
            return Result.fail({
                code: ErrorCodes.ERR_BAD_REQUEST,
                message: `Please wait ${cooldown} seconds before requesting a new OTP.`
            });
        }

        // Find user
        const userResult = await this.authRepo.findUserByEmail(email);
        if (!userResult.isSuccess) {
            return Result.fail(UserError.NotFound);
        }

        // Generate New OTP
        const otpEntity = Otp.create(email);
        await this.otpRepo.save(otpEntity);

        // Set Cooldown
        const cooldownSeconds = Number(ENV.OTP_COOLDOWN) || 60;
        await this.otpRepo.setCooldown(email, cooldownSeconds);

        // Publish Event
        await this.messagePublisher.publishOtpRequested(email, otpEntity.code);

        return Result.ok({ message: SuccessMessages.Auth.OtpResent });
    }
}

