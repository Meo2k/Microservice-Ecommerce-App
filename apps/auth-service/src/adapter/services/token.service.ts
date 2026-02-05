import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from "@org/shared/server";
import { ITokenService } from "../../application/services/index";

export class TokenService implements ITokenService {
    async signAccess(payload: { sub: number | string }): Promise<string> {
        return await signAccessToken(payload);
    }

    async signRefresh(payload: { sub: number | string }): Promise<string> {
        return await signRefreshToken(payload);
    }

    async verifyAccess(token: string): Promise<any> {
        return await verifyAccessToken(token);
    }

    async verifyRefresh(token: string): Promise<any> {
        return await verifyRefreshToken(token);
    }
}
