import { HTTP_STATUS, USER_MESSAGE } from "@org/shared";
import { IUserRepository } from "../../domain/repositories/user.repository.interface.js";
import { toUserResponseDto } from "../dtos/index.js";

/**
 * Use Case: Get All Users
 * Single Responsibility: Retrieve all users from the system
 */
export class GetAllUsersUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute() {
        const users = await this.userRepository.findAll();
        const usersDto = users.map(user => toUserResponseDto(user));

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.GET_ALL_USER.SUCCESS,
                users: usersDto
            },
        };
    }
}
