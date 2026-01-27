import { NextFunction, Request, Response } from "express";
import { prisma } from "@org/database";
import { UnauthorizedError } from "@org/shared";

export const checkShopOwnership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as any;
        const { shopId } = req.body;

        if (!shopId) {
            return next();
        }

        const shop = await prisma.shop.findUnique({
            where: { id: Number(shopId) }
        });

        if (!shop || shop.userId !== user.id) {
            throw new UnauthorizedError("Bạn không có quyền sở hữu shop này để tạo sản phẩm");
        }

        next();
    } catch (error) {
        next(error);
    }
};
