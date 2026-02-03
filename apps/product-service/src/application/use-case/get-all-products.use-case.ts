import { Result } from "@org/shared/server";
import { IProductRepository } from "../repositories/product.repository.interface";

export class GetAllProductsUseCase {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(): Promise<Result<any[]>> {
        const products = await this.productRepository.getProducts();

        return Result.ok(products);
    }
}