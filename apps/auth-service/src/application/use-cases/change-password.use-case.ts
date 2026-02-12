import { Result, SuccessMessages, ENV } from "@org/shared/server";
import { IAuthRepository } from "../repositories/auth.repository.interface.js";
import { IOtpRepository } from "../repositories/otp.repository.interface.js";
import { UserError } from "../../domain/error.domain.js";
import { toResponse, UserResponse } from "../dtos/response.dto.js";
import { ChangePasswordCommand } from "@org/shared/server";


export class ChangePasswordUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly otpRepo: IOtpRepository,
    ) { }


    async execute(data: ChangePasswordCommand): Promise<Result<{ message: string; data: UserResponse }>> {
        const { code, email, password } = data.body;

        // Find OTP
        const otpEntity = await this.otpRepo.findByEmail(email);
        if (!otpEntity) {
            return Result.fail(UserError.InvalidOtp);
        }

        const generalCheck = otpEntity.validateGeneral();
        if (!generalCheck.isSuccess) return generalCheck;

        // Find user
        const userResult = await this.authRepo.findUserByEmail(email);
        if (!userResult.isSuccess) {
            return Result.fail(UserError.NotFound);
        }

        const user = userResult.value!;

        // Verify OTP logic
        if (otpEntity.code !== code) {
            const newAttempts = await this.otpRepo.incrementAttempts(email);
            otpEntity.syncAttempts(newAttempts, Number(ENV.OTP_MAX_ATTEMPTS));
            
            await this.otpRepo.save(otpEntity);

            return Result.fail(UserError.InvalidOtp);
        }

        // Update password
        user.updatePassword(password);
        await this.authRepo.save(user);

        // Clean up OTP
        await this.otpRepo.delete(email);

        return Result.ok({ message: SuccessMessages.Auth.PasswordChanged, data: toResponse(user) });
    }
}
