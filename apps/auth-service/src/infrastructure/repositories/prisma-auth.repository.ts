import { prisma, User, Shop, getUserPermissions } from "@org/database";
import { comparePassword } from "@org/shared";
import { IAuthRepository } from "../../domain/repositories/auth.repository.interface.js";
import { UserEntity } from "../../domain/entities/user.entity.js";
import { ShopEntity } from "../../domain/entities/shop.entity.js";

/**
 * Mappers: Convert Prisma types to Domain entities
 */
function toDomainUser(prismaUser: User): UserEntity {
    return new UserEntity(
        prismaUser.id,
        prismaUser.email,
        prismaUser.username,
        prismaUser.avatar_url,
        prismaUser.bio,
        prismaUser.password,
        prismaUser.is_verified,
        prismaUser.is_locked,
        prismaUser.createdAt,
        prismaUser.updatedAt
    );
}

function toDomainShop(prismaShop: Shop): ShopEntity {
    return new ShopEntity(
        prismaShop.id,
        prismaShop.userId,
        prismaShop.name,
        prismaShop.description,
        prismaShop.logo_url,
        prismaShop.cover_url,
        prismaShop.is_active,
        prismaShop.createdAt,
        prismaShop.updatedAt
    );
}

/**
 * Prisma implementation of Auth Repository
 * Maps Prisma types to Domain entities
 */
export class PrismaAuthRepository implements IAuthRepository {

    async findUserById(id: number): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        return user ? toDomainUser(user) : null;
    }

    async findUserByEmail(email: string): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({ where: { email } });
        return user ? toDomainUser(user) : null;
    }

    async findAllUser(): Promise<UserEntity[]> {
        const users = await prisma.user.findMany();
        return users.map(toDomainUser);
    }

    async createUser(data: any): Promise<UserEntity> {
        const user = await prisma.user.create(data);
        return toDomainUser(user);
    }

    async updateUser(where: any, data: any): Promise<UserEntity> {
        const user = await prisma.user.update({ where, data });
        return toDomainUser(user);
    }

    async findShopByUserId(userId: number): Promise<ShopEntity | null> {
        const shop = await prisma.shop.findUnique({ where: { userId } });
        return shop ? toDomainShop(shop) : null;
    }

    async createShop(data: any): Promise<ShopEntity> {
        const shop = await prisma.shop.create(data);
        return toDomainShop(shop);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return comparePassword(password, hash);
    }

    async getPermissions(userId: number): Promise<bigint> {
        return getUserPermissions(userId);
    }
}
