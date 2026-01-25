import { Router } from "express";
import { createProductValidator } from "./product.validator";
import { validateRequest } from "@org/shared";

export const createProductRoute = (
    productController: any,
): Router => {
    return Router()
        .post("/", validateRequest(createProductValidator) ,productController.createProduct);
}