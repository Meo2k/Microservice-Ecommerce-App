import { Result } from "@org/shared";
import { ShopEntity } from "../../domain/entities/shop.entity";
import { IShopRepository } from "../../application/repositories/user.repository";
import { prisma, Shop as ShopModel } from "@org/database";


export class ShopRepository implements IShopRepository {
    constructor() { }
    private _to_domain(shopModel: ShopModel): ShopEntity{
        return new ShopEntity(
            shopModel.id, shopModel.name, shopModel.description,
            shopModel.logo_url, shopModel.cover_url, shopModel.is_active,
            shopModel.userId, shopModel.createdAt, shopModel.updatedAt
        )
    }

    async getShopById(id: string): Promise<Result<ShopEntity|null>> {
        try {
            const shop = await prisma.shop.findUnique({
                where: { id: +id }
            });

            if (!shop){
                return Result.ok(null)
            }

            return Result.ok(this._to_domain(shop));

        } catch (e) {
            return Result.fail({
                code: "DATABASE_ERROR",
                message: e instanceof Error ? e.message : "Unknown database error"
            });
        }
    }
}