import { prisma } from "@org/database";
import { CreateProductUseCase, DeleteProductUseCase, GetAllProductsByShopUseCase, GetDetailsProductUseCase, UpdateProductUseCase } from "../../application";
import { IProductRepository } from "../../domain";
import { ProductController } from "../controllers/product.controller";
import { ProductRepository } from "../repositories";
import { Redis } from "@upstash/redis";
import { redis } from "@org/redis";

class DIContainer {
    private productRepository: IProductRepository;

    // use case 
    private createProductUseCase: CreateProductUseCase;
    private updateProductUseCase: UpdateProductUseCase;
    private deleteProductUseCase: DeleteProductUseCase;
    private getAllProductsByShopUseCase: GetAllProductsByShopUseCase;
    private getDetailsProductUseCase: GetDetailsProductUseCase;

    private productController: ProductController;

    constructor() {
        this.productRepository = new ProductRepository();

        // use case 
        this.createProductUseCase = new CreateProductUseCase(this.productRepository);
        this.updateProductUseCase = new UpdateProductUseCase(this.productRepository);
        this.deleteProductUseCase = new DeleteProductUseCase(this.productRepository);
        this.getAllProductsByShopUseCase = new GetAllProductsByShopUseCase(this.productRepository);
        this.getDetailsProductUseCase = new GetDetailsProductUseCase(this.productRepository);

        this.productController = new ProductController(
            this.createProductUseCase,
            this.getAllProductsByShopUseCase,
            this.getDetailsProductUseCase,
            this.updateProductUseCase,
            this.deleteProductUseCase
        );
    }

    getProductController() {
        return this.productController;
    }

    getPrismaClient(): typeof prisma {
        return prisma;
    }

    getRedis(): Redis {
        return redis;
    }
}

export const container = new DIContainer(); 