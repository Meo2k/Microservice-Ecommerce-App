
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.config.js";

export class TokenProvider {
    private static readonly ACCESS_KEY = ENV.ACCESS_TOKEN_KEY as string;
    private static readonly REFRESH_KEY = ENV.REFRESH_TOKEN_KEY as string;

    static signAccessToken(payload: object): string {
        return jwt.sign(payload, this.ACCESS_KEY, {
            expiresIn: ENV.ACCESS_TOKEN_EXPIRED as any
        });
    }

    static signRefreshToken(payload: object): string {
        return jwt.sign(payload, this.REFRESH_KEY, {
            expiresIn: ENV.REFRESH_TOKEN_EXPIRED as any
        });
    }

    static verifyAccessToken(token: string) {
        return jwt.verify(token, this.ACCESS_KEY);
    }

    static verifyRefreshToken(token: string) {
        return jwt.verify(token, this.REFRESH_KEY);
    }
}

// Export helper functions for easier usage
export const signAccessToken = (payload: object) => TokenProvider.signAccessToken(payload);
export const signRefreshToken = (payload: object) => TokenProvider.signRefreshToken(payload);
export const verifyAccessToken = (token: string) => TokenProvider.verifyAccessToken(token);
export const verifyRefreshToken = (token: string) => TokenProvider.verifyRefreshToken(token);