import { ITokenService } from "../interfaces/jwt-token.interface";
import { TokenProvider } from "@org/shared";

export class JwtTokenService implements ITokenService {
    signAccess(payload: object) { return TokenProvider.signAccessToken(payload); }
    signRefresh(payload: object) { return TokenProvider.signRefreshToken(payload); }
}