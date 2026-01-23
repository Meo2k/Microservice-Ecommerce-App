import { JwtPayload } from "jsonwebtoken";

export interface ITokenRepository {
    signAccess(payload: object): string;
    signRefresh(payload: object): string;

    verifyAccess(token: string): string | JwtPayload;
    verifyRefresh(token: string): string | JwtPayload;
}