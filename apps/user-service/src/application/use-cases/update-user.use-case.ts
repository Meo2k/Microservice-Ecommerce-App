import { Result } from "@org/shared";
import { IUserRepository } from "../../domain/repositories/user.repository.interface.js";
import { toUserResponseDto, UserResponseDto } from "../dtos/index.js";
import { UpdateUserCommand } from "../../infrastructure/http/validators/user.validator.js";
import { UserError } from "../../domain/errors/user.error.js";

/**
 * Use Case: Update User
 */
export class UpdateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(command: UpdateUserCommand): Promise<Result<UserResponseDto>> {
        const userId = command.params.userId;
        const data = command.body;

        const user = await this.userRepository.findById(userId);

        if (!user) {
            return Result.fail(UserError.NotFound);
        }

        const updatedUser = await this.userRepository.update(userId, data);

        return Result.ok(toUserResponseDto(updatedUser));
    }
}

