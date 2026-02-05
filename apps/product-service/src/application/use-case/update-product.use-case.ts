import { Result } from "@org/shared/server";
import { IProductRepository } from "../repositories/product.repository.interface";
import { UpdateProductCommand } from "@org/shared/server";
import { ProductError } from "../../domain/errors/product.error.js";

export class UpdateProductUseCase {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(command: UpdateProductCommand): Promise<Result<any>> {
        const productId = String(command.params.productId);
        const updateData = command.body;

        // Verify product exists
        const product = await this.productRepository.getProductById(productId);
        if (!product) {
            return Result.fail(ProductError.NotFound);
        }

        // Domain update
        // Note: product.updateProduct accepts Partial<Omit<ProductEntity, ...>> which updateData should satisfy
        product.updateProduct(updateData as any);

        // Persist
        // We pass the updateData (plus updatedAt from entity?) to repo. 
        // Actually repo.updateProduct takes arbitrary object. 
        // To be safe and respect domain, we should pass the fields that changed.
        // For simplicity in this refactor, we pass the original updateData but we *could* rely on the entity state if we had a save(entity) method.
        // Given current repo structure, we'll continue using updateProduct but now we have verified existence and potentially applied domain logic (if any was added to updateProduct).

        // Better: Pass the properties from the updated entity that we want to save, or just the updateData.
        // Since ProductEntity.updateProduct sets updatedAt, we should include it.
        const productToSave = { ...updateData, updatedAt: product.updatedAt };

        const updatedProduct = await this.productRepository.updateProduct(productId, productToSave);

        return Result.ok(updatedProduct);
    }
}