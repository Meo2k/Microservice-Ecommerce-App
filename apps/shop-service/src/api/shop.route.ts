import { Router } from "express";
import { ShopController } from "../adapter/shop.controller";

export const createShopRoutes = (
    shopController: ShopController
) => {
    const router = Router();

    router.get("/:shopId", shopController.getShopDetails);

    return router;
}