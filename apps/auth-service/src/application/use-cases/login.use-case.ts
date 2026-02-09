import { IAuthRepository } from "../repositories/auth.repository.interface.js";
import { ITokenService, IPasswordService } from "../services/index.js";
import { LoginCommand } from "@org/shared/server";
import { Result, SuccessMessages } from "@org/shared/server";
import { toResponse, UserResponse } from "../dtos/response.dto.js";
import { UserError } from "../../domain/error.domain.js";

class LoginResponse {
    constructor(
        public readonly user: UserResponse,
        public readonly accessToken: string,
        public readonly refreshToken: string
    ) { }
}

export class LoginUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly tokenService: ITokenService,
        private readonly passwordService: IPasswordService
    ) { }

    async execute(data: LoginCommand): Promise<Result<{ message: string; data: LoginResponse }>> {
        const { email, password } = data.body;

        // Find user by email
        const userResult = await this.authRepo.findUserByEmail(email);

        if (!userResult.value) {
            return Result.fail(UserError.InvalidCredentials);
        }

        const user = userResult.value!;

        if (!user.canLogin()) {
            if (!user.isVerified) return Result.fail(UserError.UserNotVerified);
            if (user.isLocked) return Result.fail(UserError.UserLocked);
            return Result.fail(UserError.Forbidden);
        }

        // Verify password
        const isPasswordValid = await this.passwordService.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return Result.fail(UserError.InvalidCredentials);
        }

        // Generate tokens
        const accessToken = await this.tokenService.signAccess({ sub: user.id });
        const refreshToken = await this.tokenService.signRefresh({ sub: user.id });

        return Result.success(SuccessMessages.Auth.LoginSuccess, new LoginResponse(toResponse(user), accessToken, refreshToken));
    }
}
