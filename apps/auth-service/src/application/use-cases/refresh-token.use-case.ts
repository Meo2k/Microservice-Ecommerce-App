import { AUTH_MESSAGE, HTTP_STATUS } from "@org/shared";
import { ITokenRepository } from "../../domain/repositories/auth.repository.interface.js";

/**
 * Use Case: Refresh Access Token
 */
export class RefreshTokenUseCase {
    constructor(private readonly tokenRepo: ITokenRepository) { }

    async execute(userId: string) {
        const accessToken = this.tokenRepo.signAccess({ sub: userId });

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.REFRESH_TOKEN.SUCCESS,
                accessToken,
            },
        };
    }
}
