import { Result } from "@org/shared";
import { IUserRepository } from "../../domain/repositories/user.repository.interface.js";
import { toUserResponseDto, UserResponseDto } from "../dtos/index.js";
import { DeleteUserCommand } from "../../infrastructure/http/validators/user.validator.js";
import { UserError } from "../../domain/errors/user.error.js";

/**
 * Use Case: Delete User
 */
export class DeleteUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(command: DeleteUserCommand): Promise<Result<UserResponseDto>> {
        const userId = command.params.userId;

        const user = await this.userRepository.findById(userId);

        if (!user) {
            return Result.fail(UserError.NotFound);
        }

        const deletedUser = await this.userRepository.delete(userId);

        return Result.ok(toUserResponseDto(deletedUser));
    }
}

