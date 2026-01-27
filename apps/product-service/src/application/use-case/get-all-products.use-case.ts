import { ProductRepository } from "../../infrastructure/repositories";
import { HTTP_STATUS, PRODUCT_MESSAGE } from "@org/shared";


export class GetAllProductsUseCase {
    constructor(private readonly productRepository: ProductRepository) {}
    async execute() {
        const products = await this.productRepository.getProducts();

        // pagination 
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                products,
                message: PRODUCT_MESSAGE.GET_ALL_PRODUCTS.SUCCESS
            }
        }
    }
}