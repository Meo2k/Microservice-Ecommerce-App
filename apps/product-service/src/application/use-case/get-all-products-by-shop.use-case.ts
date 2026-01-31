import { Result } from "@org/shared";
import { IProductRepository } from "../repositories/product.repository.interface";
import { GetAllProductsByShopCommand } from "../../api/product.validator";

export class GetAllProductsByShopUseCase {
    constructor(private readonly productRepo: IProductRepository) { }

    async execute(command: GetAllProductsByShopCommand): Promise<Result<any[]>> {
        const shopId = String(command.params.shopId);
        const products = await this.productRepo.getProductsByCondition({ shopId });

        return Result.ok(products);
    }
}