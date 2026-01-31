import { Result } from "@org/shared";
import { ProductRepository } from "../../infrastructure/repositories";
import { UpdateProductCommand } from "../../infrastructure/http/product.validator.js";
import { ProductError } from "../../domain/errors/product.error.js";

export class UpdateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(command: UpdateProductCommand): Promise<Result<any>> {
        const productId = String(command.params.productId);
        const updateData = command.body as any;

        const product = await this.productRepository.updateProduct(productId, updateData);

        if (!product) {
            return Result.fail(ProductError.NotFound);
        }

        return Result.ok(product);
    }
}