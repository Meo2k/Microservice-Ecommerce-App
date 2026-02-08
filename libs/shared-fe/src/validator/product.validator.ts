import { z } from "zod";

// Create Product
export const createProductSchema = z.object({
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

export const createProductValidator = z.object({
    body: createProductSchema
});

// Update Product
export const updateProductSchema = z.object({
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

export const updateProductValidator = z.object({
    params: z.object({
        productId: z.string().transform(Number),
    }),
    body: updateProductSchema
});

// Delete Product
export const deleteProductValidator = z.object({
    params: z.object({
        productId: z.string().transform(Number),
    })
});

// Get Product Details
export const getProductDetailsValidator = z.object({
    params: z.object({
        productId: z.string().transform(Number),
    })
});

// Get All Products By Shop
export const getAllProductsByShopValidator = z.object({
    params: z.object({
        shopId: z.string().transform(Number),
    })
});

// Export types
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export type CreateProductCommand = z.infer<typeof createProductValidator>;
export type UpdateProductCommand = z.infer<typeof updateProductValidator>;
export type DeleteProductCommand = z.infer<typeof deleteProductValidator>;
export type GetProductDetailsCommand = z.infer<typeof getProductDetailsValidator>;
export type GetAllProductsByShopCommand = z.infer<typeof getAllProductsByShopValidator>;
