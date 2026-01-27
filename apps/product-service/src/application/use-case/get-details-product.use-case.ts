import { HTTP_STATUS } from "libs/shared/src/config/http.config";
import { ProductRepository } from "../../infrastructure/repositories";
import { PRODUCT_MESSAGE } from "libs/shared/src/config/response-message.config";

export class GetDetailsProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}
    async execute(id: string) {
        const product = await this.productRepository.getProductById(id);
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                product,
                message: PRODUCT_MESSAGE.GET_DETAILS_PRODUCT.SUCCESS
            }
        }
    }
}