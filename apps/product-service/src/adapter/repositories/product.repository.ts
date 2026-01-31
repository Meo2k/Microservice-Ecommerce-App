import { prisma, Product } from "@org/database";
import { IProductRepository } from "../../application/repositories/product.repository.interface";
import { ProductEntity } from "../../domain/entities/product.entity";

interface IAttribute {
    k: string;
    v: string;
}

function toProductEntity(product: Product): ProductEntity {
    return new ProductEntity(
        product.id,
        product.name,
        Number(product.basePrice),
        Number(product.stock),
        product.attributes as unknown as IAttribute[],
        product.images,
        product.description,
        Number(product.discount),
        Number(product.categoryId),
        Number(product.shopId),
        product.createdAt,
        product.updatedAt
    );
}

export class ProductRepository implements IProductRepository {
    async createProduct(product: ProductEntity): Promise<ProductEntity> {
        const newProduct = await prisma.product.create({ data: product as any });
        return toProductEntity(newProduct);
    }
    async updateProduct(productId: string, data: object): Promise<ProductEntity> {
        const updatedProduct = await prisma.product.update({ where: { id: productId }, data });
        return toProductEntity(updatedProduct);
    }
    async deleteProduct(productId: string): Promise<void> {
        await prisma.product.delete({ where: { id: productId } });
    }
    async getProductById(productId: string): Promise<ProductEntity | null> {
        const product = await prisma.product.findUnique({ where: { id: productId } });
        return product ? toProductEntity(product) : null;
    }
    async getProducts(): Promise<ProductEntity[]> {
        const products = await prisma.product.findMany();
        return products.map(toProductEntity);
    }

    async getProductsByCondition(where: object): Promise<ProductEntity[]> {
        const products = await prisma.product.findMany({ where });
        return products.map(toProductEntity);
    }
}
