import { AUTH_MESSAGE, HTTP_STATUS, NotFoundError } from "@org/shared";
import { toUserResponseDto } from "../dtos/index.js";
import { IAuthRepository } from "../../domain/index.js";


/**
 * Use Case: Get Current User Profile
 */
export class GetMeUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
    ) { }
    async execute(id: string) {
        const user = await this.authRepo.findUserById(+id);
        if (!user) {
            throw new NotFoundError(AUTH_MESSAGE.GET_ME.NOT_FOUND);
        }
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.GET_ME.SUCCESS,
                user: toUserResponseDto(user)
            },
        };
    }
}
