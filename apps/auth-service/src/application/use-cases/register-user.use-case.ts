import { Result, SuccessMessages } from "@org/shared";
import { IAuthRepository } from "../repositories/auth.repository.interface.js";
import { IEmailService, IOtpService } from "../services/external.js";
import { RegisterCommand } from "../../api/auth.validator.js";
import { UserError } from "../../domain/error.domain.js";
import { IPasswordService } from "../services/index.js";
import { UserEntity } from "../../domain/entities/user.entity.js";


export class RegisterUserUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly emailService: IEmailService,
        private readonly otpService: IOtpService,
        private readonly passwordService: IPasswordService
    ) { }

    async execute(data: RegisterCommand): Promise<Result<{ message: string }>> {
        const { username, email, password, isSeller } = data.body;

        // Check if user already exists
        const userExists = await this.authRepo.findUserByEmail(email);
        if (userExists.isSuccess && userExists.value) {
            return Result.fail(UserError.AlreadyExists);
        }

        // Check OTP restrictions and send OTP
        const otpCheck = await this.otpService.checkOtpRestrictions(email);
        if (!otpCheck.isSuccess) {
            return Result.fail(otpCheck.error);
        }

        // Prepare user entity
        const hashedPassword = await this.passwordService.hashPassword(password);
        const roles = isSeller ? ['SELLER'] : ['USER'];

        const newUser = UserEntity.create(username, email, hashedPassword, roles);

        // Save user (Repository handles persistence)
        await this.authRepo.createUser(newUser);

        await this.emailService.sendOtpToEmail(email, "otp.template");

        return Result.ok({ message: SuccessMessages.Auth.RegisterSuccess });
    }
}

