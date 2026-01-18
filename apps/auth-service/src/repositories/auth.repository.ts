import { IAuthRepository } from "../interfaces/auth.interface";
import { prisma } from "@org/database";

// src/repositories/prisma-auth.repository.ts
export class PrismaAuthRepository implements IAuthRepository {
    async findUserById(id: number) {
        return prisma.user.findUnique({ where: { id } });
    }
    async findUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    }
    async createUser(data: any) {
        return prisma.user.create({ data });
    }
}

