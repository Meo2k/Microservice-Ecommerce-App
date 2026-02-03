import { ENV } from '../config/env.config';

export class TokenProvider {
    private static readonly ACCESS_KEY = ENV.ACCESS_TOKEN_KEY as string;
    private static readonly REFRESH_KEY = ENV.REFRESH_TOKEN_KEY as string;

    static async signAccessToken(payload: object): Promise<string> {
        const jwt = (await import("jsonwebtoken")).default;
        return jwt.sign(payload, this.ACCESS_KEY, {
            expiresIn: ENV.ACCESS_TOKEN_EXPIRED as any
        });
    }

    static async signRefreshToken(payload: object): Promise<string> {
        const jwt = (await import("jsonwebtoken")).default;
        return jwt.sign(payload, this.REFRESH_KEY, {
            expiresIn: ENV.REFRESH_TOKEN_EXPIRED as any
        });
    }

    static async verifyAccessToken(token: string) {
        const jwt = (await import("jsonwebtoken")).default;
        return jwt.verify(token, this.ACCESS_KEY);
    }

    static async verifyRefreshToken(token: string) {
        const jwt = (await import("jsonwebtoken")).default;
        return jwt.verify(token, this.REFRESH_KEY);
    }
}


export const signAccessToken = (payload: object) => TokenProvider.signAccessToken(payload);
export const signRefreshToken = (payload: object) => TokenProvider.signRefreshToken(payload);
export const verifyAccessToken = (token: string) => TokenProvider.verifyAccessToken(token);
export const verifyRefreshToken = (token: string) => TokenProvider.verifyRefreshToken(token);