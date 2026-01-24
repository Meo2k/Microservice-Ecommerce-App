import { AUTH_MESSAGE, HTTP_STATUS, NotFoundError, UnauthorizedError } from "@org/shared";
import { IAuthRepository } from "../../domain/repositories/auth.repository.interface.js";
import { IOtpService } from "../ports/external-services.port.js";
import { ChangePasswordDto } from "../dtos/index.js";
import { User } from "@org/database";

/**
 * Use Case: Change Password
 * Changes user password after OTP verification
 */
export class ChangePasswordUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly otpService: IOtpService
    ) { }

    async execute(data: ChangePasswordDto) {
        const { code, email, password } = data;

        // Verify OTP
        await this.otpService.checkOtpRestrictions(email);

        const user = await this.authRepo.findUserByEmail(email) as User;
        if (!user) {
            throw new NotFoundError(AUTH_MESSAGE.VALIDATE_OTP.NOT_FOUND);
        }

        const storedData = await this.otpService.findOtpByEmail(email);
        if (!storedData.otp) {
            throw new UnauthorizedError(AUTH_MESSAGE.VALIDATE_OTP.INVALID);
        }

        if (Number(code) !== Number(storedData.otp)) {
            await this.otpService.handleFailedAttempts(email);
            throw new UnauthorizedError(AUTH_MESSAGE.VALIDATE_OTP.INVALID);
        }

        // Update password
        await this.authRepo.updateUser({ id: user.id }, { password });
        await this.otpService.resetOTP(email);

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.CHANGE_PASSWORD.SUCCESS,
            },
        };
    }
}
