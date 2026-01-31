
import { Result } from "@org/shared";
import { IAuthRepository } from "../repositories/auth.repository.interface.js";
import { IOtpService } from "../services/external.js";
import { UserError } from "../../domain/error.domain.js";
import { toResponse, UserResponse } from "../dtos/response.dto.js";
import { ChangePasswordCommand } from "../../api/auth.validator.js";


export class ChangePasswordUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly otpService: IOtpService,
    ) { }


    async execute(data: ChangePasswordCommand): Promise<Result<UserResponse>> {
        const { code, email, password } = data.body;

        // Verify OTP
        const otpCheck = await this.otpService.checkOtpRestrictions(email);
        if (!otpCheck.isSuccess) {
            return Result.fail(otpCheck.error);
        }

        const userResult = await this.authRepo.findUserByEmail(email);
        if (!userResult.isSuccess) {
            return Result.fail(UserError.NotFound);
        }

        const user = userResult.value!;

        const storedData = await this.otpService.findOtpByEmail(email);
        if (!storedData.otp) {
            return Result.fail(UserError.InvalidOtp);
        }

        if (Number(code) !== Number(storedData.otp)) {
            const handleResult = await this.otpService.handleFailedAttempts(email);
            if (!handleResult.isSuccess) {
                return Result.fail(handleResult.error);
            }
            return Result.fail(UserError.InvalidOtp);
        }

        user.updatePassword(password);

        // Update password
        await this.authRepo.save(user);
        await this.otpService.resetOTP(email);

        return Result.ok(toResponse(user));
    }
}
