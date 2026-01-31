import { Result } from "@org/shared";
import { IProductRepository } from "../../domain/index";
import { ProductEntity } from "../../domain/index";
import { CreateProductCommand } from "../../infrastructure/http/product.validator.js";

export class CreateProductUseCase {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(command: CreateProductCommand): Promise<Result<ProductEntity>> {
        const productData = command.body as any;
        const newProduct = await this.productRepository.createProduct(productData);

        return Result.ok(newProduct);
    }
}