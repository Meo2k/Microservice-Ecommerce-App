import { Result } from "@org/shared";
import { IProductRepository } from "../repositories/product.repository.interface";
import { DeleteProductCommand } from "@org/shared";
import { ProductError } from "../../domain/errors/product.error.js";

export class DeleteProductUseCase {
    constructor(private readonly productRepo: IProductRepository) { }

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