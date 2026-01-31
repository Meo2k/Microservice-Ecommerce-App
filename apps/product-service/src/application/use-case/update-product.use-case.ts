import { Result } from "@org/shared";
import { IProductRepository } from "../repositories/product.repository.interface";
import { UpdateProductCommand } from "../../api/product.validator";
import { ProductError } from "../../domain/errors/product.error.js";

export class UpdateProductUseCase {
    constructor(private readonly productRepository: IProductRepository) { }

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