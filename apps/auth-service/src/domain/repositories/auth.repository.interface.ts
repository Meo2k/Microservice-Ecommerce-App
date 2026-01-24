import { User, Shop } from "@org/database";

/**
 * Domain Repository Interface for Authentication
 * Defines contracts for data access without implementation details
 */
export interface IAuthRepository {
    // User operations
    findUserById(id: number): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    findAllUser(): Promise<User[]>;
    createUser(data: any): Promise<User>;
    updateUser(where: any, data: any): Promise<User>;

    // Shop operations
    findShopByUserId(userId: number): Promise<Shop | null>;
    createShop(data: any): Promise<Shop>;

    // Password operations
    comparePassword(password: string, hash: string): Promise<boolean>;

    // Permission operations
    getPermissions(userId: number): Promise<bigint>;
}

/**
 * Token Repository Interface
 * Defines contracts for JWT token operations
 */
export interface ITokenRepository {
    signAccess(payload: { sub: number | string }): string;
    signRefresh(payload: { sub: number | string }): string;
    verifyAccess(token: string): any;
    verifyRefresh(token: string): any;
}
