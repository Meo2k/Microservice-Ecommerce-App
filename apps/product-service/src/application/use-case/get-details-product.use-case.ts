import { HTTP_STATUS } from "libs/shared/src/config/http.config";
import { ProductRepository } from "../../infrastructure/repositories";
import { PRODUCT_MESSAGE } from "libs/shared/src/config/response-message.config";
import { NotFoundError } from "libs/shared/src/utils/app-error";

export class GetDetailsProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}
    async execute(id: string) {
        const product = await this.productRepository.getProductById(id);
        if (!product) {
            throw new NotFoundError(PRODUCT_MESSAGE.GET_DETAILS_PRODUCT.NOT_FOUND);
        }
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                product,
                message: PRODUCT_MESSAGE.GET_DETAILS_PRODUCT.SUCCESS
            }
        }
    }
}