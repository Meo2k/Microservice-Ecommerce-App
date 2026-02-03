
import { Result, ResultError } from "@org/shared/server";
import { ShopErrors } from "../../domain/errors/shop.errors.js";
import { IShopRepository } from "../../application/repositories/user.repository";
import { ShopEntity } from "../../domain/entities/shop.entity.js";
import { GetShopDetailsCommand } from "@org/shared/server";

class ShopResponse {
    constructor(
        public id: number,
        public name: string,
        public description: string | null,
        public logo_url: string | null,
        public cover_url: string | null,
        public is_active: boolean,
        public userId: number,
    ) { }
}



export class GetShopDetailsUseCase {
    constructor(private readonly shopRepository: IShopRepository) { }

    private _toResponse(shop: ShopEntity): ShopResponse {
        return new ShopResponse(
            shop.id,
            shop.name, shop.description, shop.logo_url,
            shop.cover_url, shop.is_active, shop.userId,
        );
    }

    async execute(command: GetShopDetailsCommand): Promise<Result<ShopResponse | ResultError>> {
        const shop = await this.shopRepository.getShopById(command.params.shopId);

        if (!shop) {
            return Result.fail(ShopErrors.NotFound);
        }

        return Result.ok(this._toResponse(shop.value!));
    }
}
