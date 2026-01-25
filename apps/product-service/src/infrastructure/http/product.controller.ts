import { CreateProductUseCase } from "../../application/index";
import { Request, Response } from "express";

export class ProductController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase
    ) {}
    async createProduct(req: Request, res: Response) {
        const body = req.body;
        
        const result = await this.createProductUseCase.execute(body);
        return res.status(result.status).json({
            status: result.status,
            metadata: {
                newProduct: result.metadata.newProduct,
                message: result.metadata.message
            }
        });
    }
}