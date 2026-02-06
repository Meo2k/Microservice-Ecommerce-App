import { Result } from "@org/shared/server";
import { ShopEntity } from "../../domain/entities/shop.entity";
import { IShopRepository } from "../../application/repositories/user.repository";
import { prisma, Shop as ShopModel } from "@org/database";


export class ShopRepository implements IShopRepository {
    constructor() { }
    private _toDomain(shopModel: ShopModel): ShopEntity {
        return new ShopEntity(
            shopModel.id, shopModel.name, shopModel.description,
            shopModel.logo_url, shopModel.cover_url, shopModel.is_active,
            shopModel.userId, shopModel.createdAt, shopModel.updatedAt
        )
    }

    async getShopById(id: string): Promise<Result<ShopEntity | null>> {
        try {
            const shop = await prisma.shop.findUnique({
                where: { id: +id }
            });

            if (!shop) {
                return Result.ok(null)
            }

            return Result.ok(this._toDomain(shop));

        } catch (e) {
            return Result.fail({
                code: "DATABASE_ERROR",
                message: e instanceof Error ? e.message : "Unknown database error"
            });
        }
    }

    async findShopByUserId(userId: number): Promise<ShopEntity | null> {
        const shop = await prisma.shop.findUnique({
            where: { userId },
            select: {
                id: true,
                userId: true,
                name: true,
                description: true,
                logo_url: true,
                cover_url: true,
                is_active: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return shop ? this._toDomain(shop) : null;
    }

    async createShop(data: any): Promise<ShopEntity> {
        const shop = await prisma.shop.create({
            data
        });
        return this._toDomain(shop);
    }

}