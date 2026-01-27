import { prisma } from "@org/database";
import { CreateProductUseCase } from "../../application";
import { IProductRepository } from "../../domain";
import { ProductController } from "../http/product.controller";
import { ProductRepository } from "../repositories";
import { Redis } from "@upstash/redis";
import { redis } from "@org/redis";

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

    getPrismaClient(): typeof prisma {
        return prisma;
    }

    getRedis(): Redis {
        return redis;
    }
}

export const container = new DIContainer(); 