import { IShopRepository } from "../../application/repositories/user.repository";
import { GetShopDetailsUseCase } from "../../application/use-case/get-shop-details.use-case";
import { ShopRepository } from "../repositories/shop.repository";
import { ShopController } from "../shop.controller";

class DIContainer {
    private shopRepository: IShopRepository;
    private getShopDetailsUseCase: GetShopDetailsUseCase;
    private shopController: ShopController;

    constructor() {
        this.shopRepository = new ShopRepository();
        this.getShopDetailsUseCase = new GetShopDetailsUseCase(this.shopRepository);
        this.shopController = new ShopController(this.getShopDetailsUseCase);
    }

    getShopController(): ShopController {
        return this.shopController;
    }
}

export const container = new DIContainer();