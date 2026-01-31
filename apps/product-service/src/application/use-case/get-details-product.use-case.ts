import { Result } from "@org/shared";
import { ProductRepository } from "../../infrastructure/repositories";
import { GetProductDetailsCommand } from "../../infrastructure/http/product.validator.js";
import { ProductError } from "../../domain/errors/product.error.js";

export class GetDetailsProductUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(command: GetProductDetailsCommand): Promise<Result<any>> {
        const productId = String(command.params.productId);
        const product = await this.productRepository.getProductById(productId);

        if (!product) {
            return Result.fail(ProductError.NotFound);
        }

        return Result.ok(product);
    }
}