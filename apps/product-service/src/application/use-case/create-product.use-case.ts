import { Result } from "@org/shared";
import { IProductRepository } from "../repositories/product.repository.interface";
import { ProductEntity } from "../../domain/index";
import { CreateProductCommand } from "../../api/product.validator";

export class CreateProductUseCase {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(command: CreateProductCommand): Promise<Result<ProductEntity>> {
        const productData = command.body as any;
        const newProduct = await this.productRepository.createProduct(productData);

        return Result.ok(newProduct);
    }
}