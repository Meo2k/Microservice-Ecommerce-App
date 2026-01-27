import { HTTP_STATUS } from "libs/shared/src/config/http.config";
import { ProductRepository } from "../../infrastructure/repositories";
import { PRODUCT_MESSAGE } from "libs/shared/src/config/response-message.config";

export class GetAllProductsByShopUseCase {
    constructor(private readonly productRepo: ProductRepository) {}
    async execute(shopId: string) {
        const products = await this.productRepo.getProductsByCondition({shopId});
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                products,
                message: PRODUCT_MESSAGE.GET_ALL_PRODUCTS_BY_SHOP.SUCCESS
            }
        }
    }
}