import { NotFoundError } from "libs/shared/src/utils/app-error";
import { ProductRepository } from "../../infrastructure/repositories";
import { PRODUCT_MESSAGE } from "libs/shared/src/config/response-message.config";
import { HTTP_STATUS } from "libs/shared/src/config/http.config";

export class DeleteProductUseCase {
    constructor(private readonly productRepo: ProductRepository) {}
    async execute(productId: string) {
        const product = await this.productRepo.getProductById(productId)
        if (!product){
            throw new NotFoundError(PRODUCT_MESSAGE.DELETE_PRODUCT.NOT_FOUND)
        }
        await this.productRepo.deleteProduct(productId);
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: PRODUCT_MESSAGE.DELETE_PRODUCT.SUCCESS
            }
        }
    }
}