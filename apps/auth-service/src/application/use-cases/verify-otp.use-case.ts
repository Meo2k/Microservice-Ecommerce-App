import { Result, SuccessMessages } from "@org/shared";
import { IAuthRepository } from "../repositories/auth.repository.interface.js";
import { IOtpService } from "../services/external.js";
import { VerifyOtpCommand } from "../../api/auth.validator.js";
import { UserError } from "../../domain/error.domain.js";

/**
 * Use Case: Verify OTP
 * Verifies OTP and activates user account
 */
export class VerifyOtpUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly otpService: IOtpService
    ) { }

    async execute(data: VerifyOtpCommand): Promise<Result<{ message: string }>> {
        const { email, otp } = data.body;

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

        const user = userResult.value!;

        // Verify OTP
        const storedData = await this.otpService.findOtpByEmail(email);
        if (!storedData.otp) {
            return Result.fail(UserError.InvalidOtp);
        }

        if (Number(otp) !== Number(storedData.otp)) {
            const handleResult = await this.otpService.handleFailedAttempts(email);
            // If handling attempts resulted in a failure (e.g. locked), return it
            if (!handleResult.isSuccess) {
                return Result.fail(handleResult.error);
            }
            return Result.fail(UserError.InvalidOtp);
        }

        // Update user verification status
        user.verify();
        await this.authRepo.save(user);
        await this.otpService.resetOTP(email);

        return Result.ok({ message: SuccessMessages.Auth.OtpVerified });
    }
}

