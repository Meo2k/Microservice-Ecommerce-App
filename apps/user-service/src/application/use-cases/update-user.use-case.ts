import { Result, SuccessMessages } from "@org/shared/server";
import { IUserRepository } from "../../application/repositories/user.repository.interface.js";
import { toUserResponseDto, UserResponseDto } from "../dtos/index.js";
import { UpdateUserCommand } from "@org/shared/server";
import { UserError } from "../../domain/errors/user.error.js";

/**
 * Use Case: Update User
 * Uses domain entity methods for business logic
 */
export class UpdateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(command: UpdateUserCommand): Promise<Result<{ message: string; data: UserResponseDto }>> {
        const userId = command.params.userId;
        const { username, bio, avatar_url } = command.body;

        // Fetch user entity
        const user = await this.userRepository.findById(userId);
        if (!user) {
            return Result.fail(UserError.NotFound);
        }

        // Use domain method to update profile
        user.updateProfile(username ?? null, bio ?? null, avatar_url ?? null);

        // Persist changes
        const updatedUser = await this.userRepository.save(user);

        return Result.success(SuccessMessages.User.UserUpdated, toUserResponseDto(updatedUser));
    }
}
