import { AUTH_MESSAGE, HTTP_STATUS } from "@org/shared";
import { toUserResponseDto } from "../dtos/index.js";
import { UserEntity } from "../../domain/entities/user.entity.js";

/**
 * Use Case: Get Current User Profile
 */
export class GetMeUseCase {
    async execute(user: UserEntity) {
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.GET_ME.SUCCESS,
                user: toUserResponseDto(user)
            },
        };
    }
}
