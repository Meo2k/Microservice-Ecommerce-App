import { Result, SuccessMessages } from "@org/shared/server";
import { IUserRepository } from "../../application/repositories/user.repository.interface.js";
import { toUserResponseDto, UserResponseDto } from "../dtos/index.js";
import { DeleteUserCommand } from "@org/shared/server";
import { UserError } from "../../domain/errors/user.error.js";

/**
 * Use Case: Delete User
 */
export class DeleteUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(command: DeleteUserCommand): Promise<Result<{ message: string; data: UserResponseDto }>> {
        const userId = command.params.userId;

        const user = await this.userRepository.findById(userId);

        if (!user) {
            return Result.fail(UserError.NotFound);
        }

        const deletedUser = await this.userRepository.delete(userId);

        return Result.success(SuccessMessages.User.UserDeleted, toUserResponseDto(deletedUser));
    }
}

