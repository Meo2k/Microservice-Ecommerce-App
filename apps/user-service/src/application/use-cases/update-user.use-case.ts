import { HTTP_STATUS, NotFoundError, USER_MESSAGE } from "@org/shared";
import { IUserRepository } from "../../domain/repositories/user.repository.interface.js";
import { toUserResponseDto, UpdateUserDto } from "../dtos/index.js";

/**
 * Use Case: Update User
 */
export class UpdateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(userId: number, data: UpdateUserDto) {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundError(USER_MESSAGE.UPDATE_USER.NOT_FOUND);
        }

        const updatedUser = await this.userRepository.update(userId, data);

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.UPDATE_USER.SUCCESS,
                user: toUserResponseDto(updatedUser)
            },
        };
    }
}
