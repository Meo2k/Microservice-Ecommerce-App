import { Result } from "@org/shared";
import { ProductRepository } from "../../infrastructure/repositories";
import { GetAllProductsByShopCommand } from "../../infrastructure/http/product.validator.js";

export class GetAllProductsByShopUseCase {
    constructor(private readonly productRepo: ProductRepository) { }

    async execute(command: GetAllProductsByShopCommand): Promise<Result<any[]>> {
        const shopId = String(command.params.shopId);
        const products = await this.productRepo.getProductsByCondition({ shopId });

        return Result.ok(products);
    }
}