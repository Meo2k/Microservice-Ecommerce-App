import { Result } from "@org/shared";
import { ShopEntity } from "../../domain/entities/shop.entity";

export interface IShopRepository {
    getShopById(id: string): Promise<Result<ShopEntity|null>>;
}
