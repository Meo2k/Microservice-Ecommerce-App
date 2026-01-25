import { HTTP_STATUS, PRODUCT_MESSAGE } from "@org/shared";
import { IProductRepository } from "../../domain/index";
import { ProductEntity } from "../../domain/index";

export class CreateProductUseCase {
    constructor(private readonly productRepository: IProductRepository) {}
    async execute(product: ProductEntity) {
        const newProduct = await this.productRepository.createProduct(product);
        return {
            status: HTTP_STATUS.CREATED, 
            metadata: {
                newProduct, 
                message: PRODUCT_MESSAGE.CREATE_PRODUCT.SUCCESS
            }
        }
    }
}