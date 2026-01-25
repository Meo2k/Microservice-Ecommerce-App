import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from "@org/shared";
import { ITokenService } from "../../application/services/index.js";

export class TokenService implements ITokenService {
    signAccess(payload: { sub: number | string }): string {
        return signAccessToken(payload);
    }

    signRefresh(payload: { sub: number | string }): string {
        return signRefreshToken(payload);
    }

    verifyAccess(token: string): any {
        return verifyAccessToken(token);
    }

    verifyRefresh(token: string): any {
        return verifyRefreshToken(token);
    }
}
