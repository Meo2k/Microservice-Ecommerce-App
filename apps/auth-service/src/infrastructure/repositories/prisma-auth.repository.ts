import { prisma, User, Shop } from "../../../../../libs/database/src/prisma-client.js";

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


export class PrismaAuthRepository implements IAuthRepository {

    async findUserById(id: number): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                username: true,
                avatar_url: true,
                bio: true,
                password: true,
                is_verified: true,
                is_locked: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return user ? toDomainUser(user) : null;
    }

    async findUserByEmail(email: string): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                username: true,
                avatar_url: true,
                bio: true,
                password: true,
                is_verified: true,
                is_locked: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return user ? toDomainUser(user) : null;
    }

    async findAllUser(): Promise<UserEntity[]> {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                avatar_url: true,
                bio: true,
                password: true,
                is_verified: true,
                is_locked: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return users.map(toDomainUser);
    }

    async createUser(data: any): Promise<UserEntity> {
        const user = await prisma.user.create({
            data
        });
        return toDomainUser(user);
    }

    async updateUser(where: any, data: any): Promise<UserEntity> {
        const user = await prisma.user.update({
            where,
            data
        });
        return toDomainUser(user);
    }

    async findShopByUserId(userId: number): Promise<ShopEntity | null> {
        const shop = await prisma.shop.findUnique({
            where: { userId },
            select: {
                id: true,
                userId: true,
                name: true,
                description: true,
                logo_url: true,
                cover_url: true,
                is_active: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return shop ? toDomainShop(shop) : null;
    }

    async createShop(data: any): Promise<ShopEntity> {
        const shop = await prisma.shop.create({
            data
        });
        return toDomainShop(shop);
    }


}
