import {z} from "zod"; 
import { ProductEntity } from "../../domain";

export const createProductValidator = z.object({
    name: z.string().min(1, "Name is required"),
    basePrice: z.number().min(1, "Base price is required"),
    stock: z.number().min(1, "Stock is required"),
    attributes: z.array(z.object({
        name: z.string().min(1, "Attribute name is required"),
        value: z.string().min(1, "Attribute value is required"),
    })),
    images: z.array(z.string().url()),
    description: z.string().min(1, "Description is required"),
    discount: z.number().min(0, "Discount must be greater than or equal to 0").max(100, "Discount must be less than or equal to 100"),
    categoryId: z.number().int().positive(),
    shopId: z.number().int().positive(),
});

export const updateProductValidator = z.object({
    name: z.string().min(1, "Name is required"),
    basePrice: z.number().min(1, "Base price is required"),
    stock: z.number().min(1, "Stock is required"),
    attributes: z.array(z.object({
        name: z.string().min(1, "Attribute name is required"),
        value: z.string().min(1, "Attribute value is required"),
    })),
    images: z.array(z.string().url()),
    description: z.string().min(1, "Description is required"),
    discount: z.number().min(0, "Discount must be greater than or equal to 0").max(100, "Discount must be less than or equal to 100"),
    categoryId: z.number().int().positive(),
});

export const deleteProductValidator = z.object({
    id: z.number().int().positive(),
});

export type CreateProductValidatorType = z.infer<typeof createProductValidator>;