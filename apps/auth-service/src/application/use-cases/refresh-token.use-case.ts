import { AUTH_MESSAGE, HTTP_STATUS } from "@org/shared";
import { ITokenService } from "../services/index.js";

/**
 * Use Case: Refresh Access Token
 */
export class RefreshTokenUseCase {
    constructor(private readonly tokenService: ITokenService) { }

    async execute(userId: string) {
        const accessToken = this.tokenService.signAccess({ sub: userId });

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.REFRESH_TOKEN.SUCCESS,
                accessToken,
            },
        };
    }
}
