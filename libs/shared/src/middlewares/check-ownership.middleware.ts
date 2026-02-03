import { NextFunction, Request, Response } from "express";
import { PASS_OWNER_ROUTES } from '../config/path.config';
import { SYSTEM_MESSAGE } from '../config/response-message.config';
import { Result } from '../utils/result';
import { ErrorCodes, HTTP_STATUS } from '../config/http.config';

export const createCheckOwnership = (prisma: any, redis: any) =>
    async (req: Request, res: Response, next: NextFunction) => {

        const isPass = PASS_OWNER_ROUTES.some((path: any) => req.path.startsWith(path));
        if (isPass) return next();

        const shopId = Number(req.params.shopId);
        const id = Number(req.headers["x-user-id"]);

        let cachedData = await redis.get(`shop:${shopId}:owner`);
        if (cachedData) {
            if (Number(cachedData) !== id) {
                return res.status(HTTP_STATUS.FORBIDDEN).json(Result.fail<any>({
                    code: ErrorCodes.ERR_UNAUTHORIZED,
                    message: SYSTEM_MESSAGE.SHOP.UNAUTHORIZED,
                }));
            }
            next();
            return;
        }

        const shop = await prisma.shop.findUnique({
            where: { id: shopId },
            select: {
                userId: true
            }
        });
        if (!shop) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json(Result.fail<any>({
                code: ErrorCodes.ERR_BAD_REQUEST,
                message: SYSTEM_MESSAGE.SHOP.NOT_FOUND,
            }));
        }
        if (shop.userId !== id) {
            return res.status(HTTP_STATUS.FORBIDDEN).json(Result.fail<any>({
                code: ErrorCodes.ERR_UNAUTHORIZED,
                message: SYSTEM_MESSAGE.SHOP.UNAUTHORIZED,
            }));
        }

        await redis.set(`shop:${shopId}:owner`, id, { ex: 60 * 60 * 24 });
        next();
    };