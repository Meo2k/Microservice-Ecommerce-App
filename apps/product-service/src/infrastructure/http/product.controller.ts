import { CreateProductUseCase } from "../../application/index";
import { GetAllProductsByShopUseCase } from "../../application/index";
import { GetDetailsProductUseCase } from "../../application/index";
import { UpdateProductUseCase } from "../../application/index";
import { DeleteProductUseCase } from "../../application/index";
import { Request, Response } from "express";

export class ProductController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly getAllProductsByShopUseCase: GetAllProductsByShopUseCase,
        private readonly getDetailsProductUseCase: GetDetailsProductUseCase, 
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase
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

    async getAllProductsByShop(req: Request, res: Response) {
        const shopId = req.params.shopId;
        const result = await this.getAllProductsByShopUseCase.execute(shopId);
        return res.status(result.status).json({
            status: result.status,
            metadata: {
                products: result.metadata.products,
                message: result.metadata.message
            }
        });
    }

    async getDetailsProduct(req: Request, res: Response) {
        const productId = req.params.productId;
        const result = await this.getDetailsProductUseCase.execute(productId);
        return res.status(result.status).json({
            status: result.status,
            metadata: {
                product: result.metadata.product,
                message: result.metadata.message
            }
        });
    } 
    
    async updateProduct(req: Request, res: Response) {
        const productId = req.params.productId;
        const body = req.body;
        const result = await this.updateProductUseCase.execute(productId, body);
        return res.status(result.status).json({
            status: result.status,
            metadata: {
                product: result.metadata.product,
                message: result.metadata.message
            }
        });
    }

    async deleteProduct(req: Request, res: Response) {
        const productId = req.params.productId;
        const result = await this.deleteProductUseCase.execute(productId);
        return res.status(result.status).json({
            status: result.status,
            metadata: {
                message: result.metadata.message
            }
        });
    }
}