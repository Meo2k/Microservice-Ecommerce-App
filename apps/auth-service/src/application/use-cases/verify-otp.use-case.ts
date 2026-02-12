import { Result, SuccessMessages, VerifyOtpCommand, ErrorCodes, ErrorMessages, ENV } from "@org/shared/server";
import { IAuthRepository } from "../repositories/auth.repository.interface.js";
import { IOtpRepository } from "../repositories/otp.repository.interface.js";
import { UserError } from "../../domain/error.domain.js";

/**
 * Use Case: Verify OTP
 * Verifies OTP and activates user account
 */
export class VerifyOtpUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly otpRepo: IOtpRepository
    ) { }

    async execute(data: VerifyOtpCommand): Promise<Result<{ message: string }>> {
        const { email, otp } = data.body;
        const maxAttempts = Number(ENV.OTP_MAX_ATTEMPTS) || 5;

        const otpEntity = await this.otpRepo.findByEmail(email);
        if (!otpEntity) {
            return Result.fail({
                code: ErrorCodes.ERR_BAD_REQUEST,
                message: ErrorMessages.Otp.OtpInvalid,
            });
        }

        const generalCheck = otpEntity.validateGeneral();
        if (!generalCheck.isSuccess) return generalCheck;

        if (otpEntity.code !== otp) {
            const newAttempts = await this.otpRepo.incrementAttempts(email);
            otpEntity.syncAttempts(newAttempts, maxAttempts);
            
            await this.otpRepo.save(otpEntity);

            return Result.fail(UserError.InvalidOtp);
        }

        const userResult = await this.authRepo.findUserByEmail(email);
        if (!userResult.isSuccess) return Result.fail(UserError.NotFound);

        const user = userResult.value!;
        user.verify();
        
        await this.authRepo.save(user);

        await this.otpRepo.delete(email);

        return Result.ok({ message: SuccessMessages.Auth.OtpVerified });
    }
}

