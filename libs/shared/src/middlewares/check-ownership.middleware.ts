import { NextFunction, Request, Response } from "express";
import { PASS_OWNER_ROUTES } from '../config/path.config.js';
import { ErrorMessages } from '../constants/messages.js';
import { Result } from '../utils/result.js';
import { ErrorCodes, HTTP_STATUS } from '../config/http.config.js';

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
                    message: ErrorMessages.Shop.UnauthorizedShopAccess,
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
                message: ErrorMessages.Shop.ShopNotFound,
            }));
        }
        if (shop.userId !== id) {
            return res.status(HTTP_STATUS.FORBIDDEN).json(Result.fail<any>({
                code: ErrorCodes.ERR_UNAUTHORIZED,
                message: ErrorMessages.Shop.UnauthorizedShopAccess,
            }));
        }

        await redis.set(`shop:${shopId}:owner`, id, { ex: 60 * 60 * 24 });
        next();
    };