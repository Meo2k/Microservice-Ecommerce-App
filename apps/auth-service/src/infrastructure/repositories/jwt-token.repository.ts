import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from "@org/shared";
import { ITokenRepository } from "../../domain/repositories/auth.repository.interface.js";


export class JwtTokenRepository implements ITokenRepository {

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
