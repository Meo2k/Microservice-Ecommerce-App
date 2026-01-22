import { ITokenRepository } from "../interfaces/jwt-token.interface";
import { TokenProvider } from "@org/shared";

export class JwtTokenRepository implements ITokenRepository {
    signAccess(payload: object) { return TokenProvider.signAccessToken(payload); }
    signRefresh(payload: object) { return TokenProvider.signRefreshToken(payload); }

    verifyAccess(token: string) { return TokenProvider.verifyAccessToken(token); }
    verifyRefresh(token: string) { return TokenProvider.verifyRefreshToken(token); }
}