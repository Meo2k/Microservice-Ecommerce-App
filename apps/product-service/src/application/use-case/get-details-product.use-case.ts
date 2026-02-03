import { Result } from "@org/shared";
import { IProductRepository } from "../repositories/product.repository.interface";
import { GetProductDetailsCommand } from "@org/shared";
import { ProductError } from "../../domain/errors/product.error.js";

export class GetDetailsProductUseCase {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(command: GetProductDetailsCommand): Promise<Result<any>> {
        const productId = String(command.params.productId);
        const product = await this.productRepository.getProductById(productId);

        if (!product) {
            return Result.fail(ProductError.NotFound);
        }

        return Result.ok(product);
    }
}