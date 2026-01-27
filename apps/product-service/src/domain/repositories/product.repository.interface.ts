import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository {
    createProduct(product: ProductEntity): Promise<ProductEntity>;
    updateProduct(productId: string, data: object): Promise<ProductEntity>;
    deleteProduct(productId: string): Promise<void>;
    getProductById(productId: string): Promise<ProductEntity | null>;
    getProductsByCondition(where: object): Promise<ProductEntity[]>;
    getProducts(): Promise<ProductEntity[]>; 
}