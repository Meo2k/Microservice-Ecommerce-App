import { Result, CUSTOM_PERM, SELLER_PERM } from "@org/shared";
import { IAuthRepository } from "../repositories/auth.repository.interface.js";
import { IEmailService, IOtpService } from "../services/external.js";
import { RegisterCommand } from "../../api/auth.validator.js";
import { UserError } from "../../domain/error.domain.js";

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

    async execute(data: RegisterCommand): Promise<Result<{ message: string }>> {
        const { username, email, password, isSeller } = data.body;

        // Check if user already exists
        const userExists = await this.authRepo.findUserByEmail(email);
        if (userExists.isSuccess) {
            return Result.fail(UserError.AlreadyExists);
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

        return Result.ok({ message: "Registration successful. Please check your email for OTP verification." });
    }
}
