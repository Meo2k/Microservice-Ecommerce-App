import { AUTH_MESSAGE, HTTP_STATUS } from "@org/shared";
import { toUserResponseDto } from "../dtos/index.js";
import { User } from "@org/database";

/**
 * Use Case: Get Current User Profile
 */
export class GetMeUseCase {
    async execute(user: User) {
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.GET_ME.SUCCESS,
                user: toUserResponseDto(user)
            },
        };
    }
}
