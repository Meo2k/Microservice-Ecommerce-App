import { Result, SuccessMessages } from "@org/shared/server";
import { IProductRepository } from "../repositories/product.repository.interface";
import { GetAllProductsByShopCommand } from "@org/shared/server";

export class GetAllProductsByShopUseCase {
    constructor(private readonly productRepo: IProductRepository) { }

    async execute(command: GetAllProductsByShopCommand): Promise<Result<{ message: string; data: any[] }>> {
        const shopId = String(command.params.shopId);
        const products = await this.productRepo.getProductsByCondition({ shopId });

        return Result.success(SuccessMessages.Product.ProductsFetched, products);
    }
}