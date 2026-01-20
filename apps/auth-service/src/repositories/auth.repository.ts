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
    async createUser(data: any) {
        return prisma.user.create(data);
    }
    async updateUser(where: any, data: any) {
        return prisma.user.update({ where, data });
    }
    async comparePassword(password: string, hash: string) {
        return comparePassword(password, hash);
    }
    toUserResponseDto(user: User) {
        return toUserResponseDto(user);
    }
}

