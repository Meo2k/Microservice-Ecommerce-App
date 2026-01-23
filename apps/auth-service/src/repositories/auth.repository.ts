import { comparePassword } from "@org/shared";
import { IAuthRepository } from "../interfaces/auth.interface";
import { prisma, User } from "@org/database";
import { toUserResponseDto } from "../dtos/auth.dto";

// src/repositories/prisma-auth.repository.ts
export class AuthRepository implements IAuthRepository {
    async findUserById(id: number) {
        return prisma.user.findUnique({ where: { id } });
    }
    async findUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    }
    async findAllUser() {
        return prisma.user.findMany();
    }
    async createUser(data: any) {
        return prisma.user.create(data);
    }
    async updateUser(where: any, data: any) {
        return prisma.user.update({ where, data });
    }

    async findShopByUserId(userId: number) {
        return prisma.shop.findUnique({ where: { userId } });
    }
    async createShop(data: any) {
        return prisma.shop.create(data);
    }

    async comparePassword(password: string, hash: string) {
        return comparePassword(password, hash);
    }
    toUserResponseDto(user: User) {
        return toUserResponseDto(user);
    }

    async getPermissions(userId: number): Promise<bigint> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                userRole: {
                    include: {
                        role: true
                    }
                }
            }
        });

        if (!user) return BigInt(0);

        return user.userRole.reduce((acc, curr) => acc | curr.role.permissions, BigInt(0));
    }
}

