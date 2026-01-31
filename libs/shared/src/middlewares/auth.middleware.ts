import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { PUBLIC_ROUTES } from "../config/path.config.js";
import { ENV } from "../config/env.config.js";
import { SYSTEM_MESSAGE } from "../config/response-message.config.js";
import { Result, ErrorCodes, HTTP_STATUS } from "../index.js";

export const createAuthMiddleware = (prisma: any, redis: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];

        const isPublic = PUBLIC_ROUTES.some((path) => req.path.startsWith(path));

        if (!token) {
            if (isPublic) return next();
            res.status(HTTP_STATUS.UNAUTHORIZED).json(Result.fail<any>({
                code: ErrorCodes.ERR_UNAUTHORIZED,
                message: SYSTEM_MESSAGE.AUTH.UNAUTHORIZED,
            }));
            return;
        }

        try {
            const decoded = jwt.verify(token, ENV.ACCESS_TOKEN_KEY) as { sub: string };
            const userId = Number(decoded.sub);

            const cachedData = await redis.get(`user_auth:${userId}`) as any;
            let userData;

            if (cachedData) {
                if (typeof cachedData === 'object') {
                    userData = cachedData;
                } else {
                    userData = JSON.parse(cachedData);
                }
            } else {
                const dbUser = await prisma.user.findUnique({
                    where: { id: userId },
                    select: {
                        is_verified: true,
                        is_locked: true,
                        userRole: {
                            select: {
                                role: { select: { permissions: true } }
                            }
                        }
                    }
                });


                if (!dbUser) {
                    res.status(HTTP_STATUS.BAD_REQUEST).json(Result.fail<any>({
                        code: ErrorCodes.ERR_BAD_REQUEST,
                        message: SYSTEM_MESSAGE.AUTH.NOT_FOUND,
                    }));
                    return;
                }

                const totalPermissions = dbUser.userRole.reduce(
                    (acc: bigint, curr: any) => acc | curr.role.permissions,
                    BigInt(0)
                );

                userData = {
                    is_verified: dbUser.is_verified,
                    is_locked: dbUser.is_locked,
                    permissions: totalPermissions.toString()
                };

                await redis.set(`user_auth:${userId}`, JSON.stringify(userData), { ex: 3600 });
            }

            if (!userData.is_verified) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json(Result.fail<any>({
                    code: ErrorCodes.ERR_UNAUTHORIZED,
                    message: SYSTEM_MESSAGE.AUTH.NOT_VERIFIED,
                }));
                return;
            }
            if (userData.is_locked) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json(Result.fail<any>({
                    code: ErrorCodes.ERR_UNAUTHORIZED,
                    message: SYSTEM_MESSAGE.AUTH.LOCKED,
                }));
                return;
            }

            // inject user info into request headers 
            req.headers['x-user-id'] = String(userId);
            req.headers['x-user-permissions'] = userData.permissions;

            next();
        } catch (error) {
            console.log("Error middleware : ", error)
            res.status(HTTP_STATUS.UNAUTHORIZED).json(Result.fail<any>({
                code: ErrorCodes.ERR_UNAUTHORIZED,
                message: SYSTEM_MESSAGE.AUTH.TOKEN_INVALID,
            }));
            return;
        }
    }
}

export const authenticateRefreshToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies["refresh_token"];
        const decoded = jwt.verify(token, ENV.REFRESH_TOKEN_KEY) as { sub: string };
        req.headers['x-user-id'] = String(decoded.sub)

        next();
    } catch (error) {
        console.log("Error middleware : ", error)
        res.status(HTTP_STATUS.UNAUTHORIZED).json(Result.fail<any>({
            status: HTTP_STATUS.UNAUTHORIZED,
            code: ErrorCodes.ERR_UNAUTHORIZED,
            message: SYSTEM_MESSAGE.AUTH.TOKEN_INVALID,
        }));
        return;
    }
}

