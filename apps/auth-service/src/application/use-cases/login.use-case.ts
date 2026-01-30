import { AUTH_MESSAGE, HTTP_STATUS, NotFoundError, UnauthorizedError } from "@org/shared";
import { IAuthRepository } from "../repositories/auth.repository.interface.js";
import { ITokenService, IPasswordService } from "../services/index.js";
import { LoginDto } from "../dtos/index.js";

/**
 * Use Case: Login
 * Handles user authentication and token generation
 */
export class LoginUseCase {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly tokenService: ITokenService,
        private readonly passwordService: IPasswordService
    ) { }

    async execute(data: LoginDto) {
        const { email, password } = data;

        // Find user by email
        const user = await this.authRepo.findUserByEmail(email);
        if (!user) {
            throw new NotFoundError(AUTH_MESSAGE.LOGIN.NOT_FOUND);
        }

        // Verify password
        const isPasswordValid = await this.passwordService.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError(AUTH_MESSAGE.LOGIN.UNAUTHORIZED);
        }

        // Generate tokens
        const accessToken = this.tokenService.signAccess({ sub: user.id });
        const refreshToken = this.tokenService.signRefresh({ sub: user.id });

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
