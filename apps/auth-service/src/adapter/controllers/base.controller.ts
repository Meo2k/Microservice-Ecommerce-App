import { Response } from "express";
import { Result, HTTP_STATUS, HttpStatusCodeType } from "@org/shared/server";
import { CookieParseOptions } from "cookie-parser";

export abstract class BaseController {
    protected handleResult<T>(
        result: Result<T>,
        res: Response,
        successStatus: number = HTTP_STATUS.OK
    ) {
        if (!result.isSuccess) {
            const { status, ...errorData } = result.error;
            return res.status(status!).json(errorData);
        }
        return res.status(successStatus).json(result.value);
    }

    protected handleResultWithCookie<T extends Record<string, any>>(
        result: Result<T>,
        res: Response,
        status: HttpStatusCodeType = HTTP_STATUS.OK, 
        cookieName: string,
        cookieField: keyof T = 'refreshToken' as keyof T,
        options?: CookieParseOptions
    ) {
        if (!result.isSuccess) {
            const { status, ...errorData } = result.error;
            return res.status(status!).json(errorData);
        }

        const data = { ...result.value };
        const cookieValue = data[cookieField as string];
        delete data[cookieField as string];

        if (cookieValue) {
            res.cookie(cookieName, cookieValue, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                ...options,
            });
        }

        return res.status(status).json(data);
    }
}