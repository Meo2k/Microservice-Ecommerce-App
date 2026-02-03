import { IAuthRepository } from "../../domain/index.js";
import { Result } from "@org/shared/server";
import { UserError } from "../../domain/error.domain.js";
import { toResponse, UserResponse } from "../dtos/response.dto.js";


export class GetMeUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
    ) { }
    async execute(id: string): Promise<Result<UserResponse>> {
        const userResult = await this.authRepo.findUserById(+id);
        if (!userResult.isSuccess) {
            return Result.fail(UserError.NotFound);
        }
        const user = userResult.value!
        return Result.ok(toResponse(user));
    }
}
