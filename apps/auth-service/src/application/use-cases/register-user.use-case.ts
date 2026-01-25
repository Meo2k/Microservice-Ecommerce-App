import { AUTH_MESSAGE, ConflictError, CUSTOM_PERM, HTTP_STATUS, SELLER_PERM } from "@org/shared";
import { IAuthRepository } from "../../domain/repositories/auth.repository.interface.js";
import { IEmailService, IOtpService } from "../services/external.js";
import { RegisterDto } from "../dtos/index.js";

/**
 * Use Case: Register new user
 * Handles user registration with OTP verification
 */
export class RegisterUserUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly emailService: IEmailService,
        private readonly otpService: IOtpService,
    ) { }

    async execute(data: RegisterDto) {
        const { username, email, password, isSeller } = data;

        // Check if user already exists
        const userExists = await this.authRepo.findUserByEmail(email);
        if (userExists) {
            throw new ConflictError(AUTH_MESSAGE.REGISTER.CONFLICT);
        }

        // Check OTP restrictions and send OTP
        await this.otpService.checkOtpRestrictions(email);
        await this.emailService.sendOtpToEmail(email, "otp.template");

        // Create user
        await this.authRepo.createUser({
            data: {
                username,
                email,
                password,
                role: isSeller ? SELLER_PERM : CUSTOM_PERM
            }
        });

        return {
            status: HTTP_STATUS.CREATED,
            metadata: {
                message: AUTH_MESSAGE.REGISTER.SUCCESS,
            },
        };
    }
}
