import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository {
    createProduct(product: ProductEntity): Promise<ProductEntity>;
    updateProduct(product: ProductEntity): Promise<ProductEntity>;
    deleteProduct(productId: string): Promise<void>;
    getProductById(productId: string): Promise<ProductEntity | null>;
    getProducts(): Promise<ProductEntity[]>; 
}