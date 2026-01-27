import { ProductRepository } from "../../infrastructure/repositories";
import { HTTP_STATUS } from "libs/shared/src/config/http.config";
import { PRODUCT_MESSAGE } from "libs/shared/src/config/response-message.config";
import { ProductEntity } from "../../domain";

export class UpdateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}
    async execute(productId: string, updateProductDto: ProductEntity) {
        const product = await this.productRepository.updateProduct(productId, updateProductDto);
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                product,
                message: PRODUCT_MESSAGE.UPDATE_PRODUCT.SUCCESS
            }
        }
    }
}