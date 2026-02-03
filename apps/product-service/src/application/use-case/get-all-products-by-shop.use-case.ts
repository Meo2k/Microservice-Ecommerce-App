import { Result } from "@org/shared/server";
import { IProductRepository } from "../repositories/product.repository.interface";
import { GetAllProductsByShopCommand } from "@org/shared/server";

export class GetAllProductsByShopUseCase {
    constructor(private readonly productRepo: IProductRepository) { }

    async execute(command: GetAllProductsByShopCommand): Promise<Result<any[]>> {
        const shopId = String(command.params.shopId);
        const products = await this.productRepo.getProductsByCondition({ shopId });

        return Result.ok(products);
    }
}