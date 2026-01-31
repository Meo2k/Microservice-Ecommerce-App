import { Result } from "@org/shared";
import { IUserRepository } from "../../domain/repositories/user.repository.interface.js";
import { toUserResponseDto, UserResponseDto } from "../dtos/index.js";

/**
 * Use Case: Get All Users
 * Single Responsibility: Retrieve all users from the system
 */
export class GetAllUsersUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(): Promise<Result<UserResponseDto[]>> {
        const users = await this.userRepository.findAll();
        const usersDto = users.map(user => toUserResponseDto(user));

        return Result.ok(usersDto);
    }
}

