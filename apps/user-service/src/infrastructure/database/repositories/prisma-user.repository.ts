import { prisma, User, Address, City, Country, getUserPermissions } from "@org/database";
import { IUserRepository } from "../../../domain/repositories/user.repository.interface.js";

/**
 * Prisma implementation of User Repository
 * Infrastructure layer - framework specific
 */
export class PrismaUserRepository implements IUserRepository {

    async findById(id: number): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    async findAll(): Promise<User[]> {
        return prisma.user.findMany();
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        return prisma.user.update({ where: { id }, data });
    }

    async delete(id: number): Promise<User> {
        return prisma.user.delete({ where: { id } });
    }

    async findAddressesByUserId(userId: number): Promise<Address[]> {
        return prisma.address.findMany({ where: { userId } });
    }

    async createAddress(userId: number, data: Partial<Address>): Promise<Address> {
        return prisma.address.create({ data: { ...data, userId } as any });
    }

    async updateAddress(id: number, data: Partial<Address>): Promise<Address> {
        return prisma.address.update({ where: { id }, data });
    }

    async deleteAddress(id: number): Promise<Address> {
        return prisma.address.delete({ where: { id } });
    }

    async findCountryById(id: number): Promise<Country | null> {
        return prisma.country.findUnique({ where: { id } });
    }

    async findCityById(id: number): Promise<City | null> {
        return prisma.city.findUnique({ where: { id } });
    }

    async getPermissions(userId: number): Promise<bigint> {
        return getUserPermissions(userId);
    }
}
