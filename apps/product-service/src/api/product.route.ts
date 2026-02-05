import { validateRequest, asyncHandler, createProductValidator, updateProductValidator } from "@org/shared/server";
import { Router } from "express";

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