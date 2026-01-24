import { AUTH_MESSAGE, HTTP_STATUS, NotFoundError, UnauthorizedError } from "@org/shared";
import { IAuthRepository } from "../../domain/repositories/auth.repository.interface.js";
import { IOtpService } from "../ports/external-services.port.js";
import { VerifyOtpDto } from "../dtos/index.js";

/**
 * Use Case: Verify OTP
 * Verifies OTP and activates user account
 */
export class VerifyOtpUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly otpService: IOtpService
    ) { }

    async execute(data: VerifyOtpDto) {
        const { email, otp } = data;

        // Check OTP restrictions
        await this.otpService.checkOtpRestrictions(email);

        // Find user
        const user = await this.authRepo.findUserByEmail(email);
        if (!user) {
            throw new NotFoundError(AUTH_MESSAGE.VALIDATE_OTP.NOT_FOUND);
        }

        // Verify OTP
        const storedData = await this.otpService.findOtpByEmail(email);
        if (!storedData.otp) {
            throw new UnauthorizedError(AUTH_MESSAGE.VALIDATE_OTP.INVALID);
        }

        if (Number(otp) !== Number(storedData.otp)) {
            await this.otpService.handleFailedAttempts(email);
            throw new UnauthorizedError(AUTH_MESSAGE.VALIDATE_OTP.INVALID);
        }

        // Update user verification status
        await this.authRepo.updateUser({ id: user.id }, { is_verified: true });
        await this.otpService.resetOTP(email);

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.VERIFY_OTP.SUCCESS,
            },
        };
    }
}
