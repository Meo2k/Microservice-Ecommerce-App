import { AUTH_MESSAGE, HTTP_STATUS, NotFoundError } from "@org/shared";
import { IAuthRepository } from "../../domain/repositories/auth.repository.interface.js";
import { IEmailService, IOtpService } from "../ports/external-services.port.js";
import { ResendOtpDto } from "../dtos/index.js";

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

    async execute(data: ResendOtpDto) {
        const { email } = data;

        // Check OTP restrictions
        await this.otpService.checkOtpRestrictions(email);

        // Find user
        const user = await this.authRepo.findUserByEmail(email);
        if (!user) {
            throw new NotFoundError(AUTH_MESSAGE.RESEND_OTP.NOT_FOUND);
        }

        // Send new OTP
        await this.emailService.sendOtpToEmail(email, "otp.template");

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.RESEND_OTP.SUCCESS,
            },
        };
    }
}
