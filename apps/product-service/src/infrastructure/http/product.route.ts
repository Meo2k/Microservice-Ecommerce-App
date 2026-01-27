import { validateRequest } from "@org/shared";
import { Router } from "express";
import { createProductValidator } from "./product.validator";

export const createProductRoute = (
    productController: any,
): Router => {
    return Router()
        .get("/:shopId", productController.getProducts)
        .post(
            "/:shopId",
            validateRequest(createProductValidator),
            productController.createProduct
        );

}