import { NextFunction, Request, Response } from "express";
import { NotFoundError, UnauthorizedError } from "../utils/app-error.js";
import { PASS_OWNER_ROUTES } from "../config/path.config.js";
import { SYSTEM_MESSAGE } from "../config/response-message.config.js";

export const createCheckOwnership = (prisma: any, redis: any) => 
 async (req: Request, res: Response, next: NextFunction) => {

    const isPass = PASS_OWNER_ROUTES.some((path: any) => req.path.startsWith(path));
    if (isPass) return next();

    const shopId = Number(req.params.shopId);
    const id = Number(req.headers["x-user-id"]);

    let cachedData = await redis.get(`shop:${shopId}:owner`);
    if (cachedData) {
        if (Number(cachedData) !== id) {
            throw new UnauthorizedError(SYSTEM_MESSAGE.SHOP.UNAUTHORIZED);
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
        throw new NotFoundError(SYSTEM_MESSAGE.SHOP.NOT_FOUND);
    }
    if (shop.userId !== id){
        throw new UnauthorizedError(SYSTEM_MESSAGE.SHOP.UNAUTHORIZED);
    }

    await redis.set(`shop:${shopId}:owner`, id, {ex: 60 * 60 * 24});
    next();
};