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

    // Password operations
    comparePassword(password: string, hash: string): Promise<boolean>;

    // Permission operations
    getPermissions(userId: number): Promise<bigint>;
}

/**
 * Token Repository Interface
 */
export interface ITokenRepository {
    signAccess(payload: { sub: number | string }): string;
    signRefresh(payload: { sub: number | string }): string;
    verifyAccess(token: string): any;
    verifyRefresh(token: string): any;
}
