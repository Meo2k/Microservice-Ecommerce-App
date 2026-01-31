import { CreateProductUseCase } from "../../application/index";
import { GetAllProductsByShopUseCase } from "../../application/index";
import { GetDetailsProductUseCase } from "../../application/index";
import { UpdateProductUseCase } from "../../application/index";
import { DeleteProductUseCase } from "../../application/index";
import { Request, Response } from "express";
import { BaseController } from "./base.controller.js";
import { HTTP_STATUS } from "@org/shared";

export class ProductController extends BaseController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly getAllProductsByShopUseCase: GetAllProductsByShopUseCase,
        private readonly getDetailsProductUseCase: GetDetailsProductUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase
    ) {
        super();
    }

    async createProduct(req: Request, res: Response) {
        const result = await this.createProductUseCase.execute(req as any);
        this.handleResult(result, res, HTTP_STATUS.CREATED);
    }

    async getAllProductsByShop(req: Request, res: Response) {
        const result = await this.getAllProductsByShopUseCase.execute(req as any);
        this.handleResult(result, res, HTTP_STATUS.OK);
    }

    async getDetailsProduct(req: Request, res: Response) {
        const result = await this.getDetailsProductUseCase.execute(req as any);
        this.handleResult(result, res, HTTP_STATUS.OK);
    }

    async updateProduct(req: Request, res: Response) {
        const result = await this.updateProductUseCase.execute(req as any);
        this.handleResult(result, res, HTTP_STATUS.OK);
    }

    async deleteProduct(req: Request, res: Response) {
        const result = await this.deleteProductUseCase.execute(req as any);
        this.handleResult(result, res, HTTP_STATUS.OK);
    }
}