import { IProductRepository } from "../repositories/product.repository.interface";
import { HTTP_STATUS, PRODUCT_MESSAGE } from "@org/shared";


export class GetAllProductsUseCase {
    constructor(private readonly productRepository: IProductRepository) {}
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