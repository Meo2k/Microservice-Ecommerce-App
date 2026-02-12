import { Result, SuccessMessages, RegisterCommand, ENV } from "@org/shared/server";
import { IAuthRepository } from "../repositories/auth.repository.interface.js";
import { IOtpRepository } from "../repositories/otp.repository.interface.js";
import { UserError } from "../../domain/error.domain.js";
import { IPasswordService } from "../services/index.js";
import { UserEntity } from "../../domain/entities/user.entity.js";
import { Otp } from "../../domain/entities/otp.entity.js";
import { IAuthMessagePublisher } from "../services/message-publisher.interface.js";

export class RegisterUserUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly otpRepo: IOtpRepository,
        private readonly messagePublisher: IAuthMessagePublisher,
        private readonly passwordService: IPasswordService
    ) { }

    async execute(data: RegisterCommand): Promise<Result<{ message: string }>> {
        const { username, email, password, isSeller } = data.body;


        // Check if user already exists
        const userExists = await this.authRepo.findUserByEmail(email);
        if (userExists.isSuccess && userExists.value) {
            return Result.fail(UserError.AlreadyExists);
        }

        // Prepare user entity
        const hashedPassword = await this.passwordService.hashPassword(password);
        const roles = isSeller ? ['SELLER'] : ['USER'];
        const newUser = UserEntity.create(username, email, hashedPassword, roles);

        // Generate OTP Entity
        const otpEntity = Otp.create(email);

        // Save Persistence
        await this.authRepo.createUser(newUser);
        await this.otpRepo.save(otpEntity);

        // Set Cooldown
        const cooldownSeconds = Number(ENV.OTP_COOLDOWN) || 60;
        await this.otpRepo.setCooldown(email, cooldownSeconds);

        // OTP Requested (for notification service)
        await this.messagePublisher.publishOtpRequested(email, otpEntity.code);

        return Result.ok({ message: SuccessMessages.Auth.RegisterSuccess });
    }
}

