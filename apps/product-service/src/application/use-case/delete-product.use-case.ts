import { Result } from "@org/shared";
import { ProductRepository } from "../../infrastructure/repositories";
import { DeleteProductCommand } from "../../infrastructure/http/product.validator.js";
import { ProductError } from "../../domain/errors/product.error.js";

export class DeleteProductUseCase {
    constructor(private readonly productRepo: ProductRepository) { }

    async execute(command: DeleteProductCommand): Promise<Result<{ message: string }>> {
        const productId = String(command.params.productId);

        const product = await this.productRepo.getProductById(productId);
        if (!product) {
            return Result.fail(ProductError.NotFound);
        }

        await this.productRepo.deleteProduct(productId);

        return Result.ok({ message: "Product deleted successfully" });
    }
}