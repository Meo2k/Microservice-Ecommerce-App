import { UserEntity } from "../entities/user.entity.js";
import { ShopEntity } from "../entities/shop.entity.js";


export interface IAuthRepository {
    // User operations
    findUserById(id: number): Promise<UserEntity | null>;
    findUserByEmail(email: string): Promise<UserEntity | null>;
    findAllUser(): Promise<UserEntity[]>;
    createUser(data: any): Promise<UserEntity>;
    updateUser(where: any, data: any): Promise<UserEntity>;

    // Shop operations
    findShopByUserId(userId: number): Promise<ShopEntity | null>;
    createShop(data: any): Promise<ShopEntity>;
}


