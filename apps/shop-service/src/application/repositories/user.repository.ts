import { Result } from "@org/shared/server";
import { ShopEntity } from "../../domain/entities/shop.entity";

export interface IShopRepository {
    getShopById(id: string): Promise<Result<ShopEntity|null>>;
    findShopByUserId(userId: number): Promise<ShopEntity | null>;
    createShop(data: any): Promise<ShopEntity>;
}
