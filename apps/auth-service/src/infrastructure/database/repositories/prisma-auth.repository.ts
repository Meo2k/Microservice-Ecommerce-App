import { prisma, User, Shop, getUserPermissions } from "@org/database";
import { comparePassword } from "@org/shared";
import { IAuthRepository } from "../../../domain/repositories/auth.repository.interface.js";

/**
 * Prisma implementation of Auth Repository
 * Infrastructure layer - framework specific
 */
export class PrismaAuthRepository implements IAuthRepository {

    async findUserById(id: number): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async findAllUser(): Promise<User[]> {
        return prisma.user.findMany();
    }

    async createUser(data: any): Promise<User> {
        return prisma.user.create(data);
    }

    async updateUser(where: any, data: any): Promise<User> {
        return prisma.user.update({ where, data });
    }

    async findShopByUserId(userId: number): Promise<Shop | null> {
        return prisma.shop.findUnique({ where: { userId } });
    }

    async createShop(data: any): Promise<Shop> {
        return prisma.shop.create(data);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return comparePassword(password, hash);
    }

    async getPermissions(userId: number): Promise<bigint> {
        return getUserPermissions(userId);
    }
}
