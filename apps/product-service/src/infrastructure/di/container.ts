import { CreateProductUseCase } from "../../application";
import { IProductRepository } from "../../domain";
import { ProductController } from "../http/product.controller";
import { ProductRepository } from "../repositories";

class DIContainer {
    private productRepository: IProductRepository;

    private createProductUseCase: CreateProductUseCase;

    private productController: ProductController;

    constructor() {
        this.productRepository = new ProductRepository();
        this.createProductUseCase = new CreateProductUseCase(this.productRepository);

        this.productController = new ProductController(this.createProductUseCase);
    }

    getProductController() {
        return this.productController;
    }
}

export const container = new DIContainer(); 