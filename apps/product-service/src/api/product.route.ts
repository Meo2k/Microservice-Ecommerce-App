import { validateRequest } from "@org/shared";
import { Router } from "express";
import { createProductValidator, updateProductValidator } from "./product.validator";
import { asyncHandler } from "@org/shared";

export const createProductRoute = (
    productController: any,
): Router => {
    return Router()
        .get("/:shopId", asyncHandler(productController.getAllProductsByShop))
        .post(
            "/:shopId",
            validateRequest(createProductValidator),
            asyncHandler(productController.createProduct)
        )
        .get("/:productId", asyncHandler(productController.getDetailsProduct))
        .put(
            "/:productId",
            validateRequest(updateProductValidator),
            asyncHandler(productController.updateProduct)
        )
        .delete("/:productId", asyncHandler(productController.deleteProduct));

}