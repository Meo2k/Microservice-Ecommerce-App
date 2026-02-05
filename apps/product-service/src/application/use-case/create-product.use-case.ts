import { Result } from "@org/shared/server";
import { IProductRepository } from "../repositories/product.repository.interface";
import { ProductEntity } from "../../domain/entities/product.entity";
import { CreateProductCommand } from "@org/shared/server";

export class CreateProductUseCase {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(command: CreateProductCommand): Promise<Result<ProductEntity>> {
        const productData = command.body as any;
        const newProduct = await this.productRepository.createProduct(productData);

        return Result.ok(newProduct);
    }
}