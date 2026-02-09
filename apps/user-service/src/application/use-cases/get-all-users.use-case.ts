import { Result, SuccessMessages } from "@org/shared/server";
import { IUserRepository } from "../../application/repositories/user.repository.interface.js";
import { toUserResponseDto, UserResponseDto } from "../dtos/index.js";

/**
 * Use Case: Get All Users
 * Single Responsibility: Retrieve all users from the system
 */
export class GetAllUsersUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(): Promise<Result<{ message: string; data: UserResponseDto[] }>> {
        const users = await this.userRepository.findAll();
        const usersDto = users.map(user => toUserResponseDto(user));

        return Result.success(SuccessMessages.User.UsersFetched, usersDto);
    }
}

