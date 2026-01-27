import { authenticateJwt, validateRequest } from "@org/shared";
import { Router } from "express";
import { createProductValidator } from "./product.validator";

export const createProductRoute = (
    productController: any,
): Router => {
    return Router()
        .post(
            "/",
            authenticateJwt,
            validateRequest(createProductValidator),
            productController.createProduct
        );
}