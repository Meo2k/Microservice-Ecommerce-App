import { AUTH_MESSAGE, ConflictError, HTTP_STATUS, SELLER_PERM } from "@org/shared";
import { IAuthRepository } from "../../domain/repositories/auth.repository.interface.js";
import { RegisterSellerDto } from "../dtos/index.js";
import { UserEntity } from "../../domain/entities/user.entity.js";

/**
 * Use Case: Create Shop (Register as Seller)
 * TODO: This should be moved to a separate Shop Service in the future
 */
export class CreateShopUseCase {
    constructor(private readonly authRepo: IAuthRepository) { }

    async execute(user: UserEntity, data: RegisterSellerDto) {
        const { shopName, logoShop, coverShop, description, address, phone } = data;

        // Check if shop already exists
        const shopExists = await this.authRepo.findShopByUserId(user.id);
        if (shopExists) {
            throw new ConflictError(AUTH_MESSAGE.REGISTER_SELLER.CONFLICT);
        }

        // Update user role to seller
        await this.authRepo.updateUser({ id: user.id }, { role: SELLER_PERM });

        // Prepare shop data
        const dataCreatedShop: any = {
            shopName,
            address,
            phone,
            description,
            userId: user.id,
        };

        if (logoShop) {
            dataCreatedShop.logo_url = logoShop;
        }

        if (coverShop) {
            dataCreatedShop.cover_url = coverShop;
        }

        // Create shop
        await this.authRepo.createShop({ data: dataCreatedShop });

        return {
            status: HTTP_STATUS.CREATED,
            metadata: {
                message: AUTH_MESSAGE.REGISTER_SELLER.SUCCESS,
            },
        };
    }
}
