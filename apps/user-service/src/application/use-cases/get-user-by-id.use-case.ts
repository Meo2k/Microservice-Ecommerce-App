import { HTTP_STATUS, USER_MESSAGE } from "@org/shared";
import { IUserRepository } from "../../domain/repositories/user.repository.interface.js";
import { toUserResponseDto } from "../dtos/index.js";

/**
 * Use Case: Get User By ID
 */
export class GetUserByIdUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(userId: number) {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new Error(USER_MESSAGE.GET_USER.NOT_FOUND);
        }

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.GET_USER.SUCCESS,
                user: toUserResponseDto(user)
            },
        };
    }
}
