import { HTTP_STATUS, NotFoundError, USER_MESSAGE } from "@org/shared";
import { IUserRepository } from "../../domain/repositories/user.repository.interface.js";
import { toUserResponseDto } from "../dtos/index.js";

/**
 * Use Case: Delete User
 */
export class DeleteUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(userId: number) {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundError(USER_MESSAGE.DELETE_USER.NOT_FOUND);
        }

        const deletedUser = await this.userRepository.delete(userId);

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.DELETE_USER.SUCCESS,
                user: toUserResponseDto(deletedUser)
            },
        };
    }
}
