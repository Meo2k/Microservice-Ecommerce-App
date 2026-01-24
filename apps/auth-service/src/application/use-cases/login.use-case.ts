import { AUTH_MESSAGE, HTTP_STATUS, NotFoundError, UnauthorizedError } from "@org/shared";
import { IAuthRepository, ITokenRepository } from "../../domain/repositories/auth.repository.interface.js";
import { LoginDto } from "../dtos/index.js";
import { User } from "@org/database";

/**
 * Use Case: Login
 * Handles user authentication and token generation
 */
export class LoginUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly tokenRepo: ITokenRepository
    ) { }

    async execute(data: LoginDto) {
        const { email, password } = data;

        // Find user by email
        const user = await this.authRepo.findUserByEmail(email) as User;
        if (!user) {
            throw new NotFoundError(AUTH_MESSAGE.LOGIN.NOT_FOUND);
        }

        // Verify password
        const isPasswordValid = await this.authRepo.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError(AUTH_MESSAGE.LOGIN.UNAUTHORIZED);
        }

        // Generate tokens
        const accessToken = this.tokenRepo.signAccess({ sub: user.id });
        const refreshToken = this.tokenRepo.signRefresh({ sub: user.id });

        return {
            status: HTTP_STATUS.OK,
            refreshToken,
            metadata: {
                message: AUTH_MESSAGE.LOGIN.SUCCESS,
                accessToken,
            },
        };
    }
}
