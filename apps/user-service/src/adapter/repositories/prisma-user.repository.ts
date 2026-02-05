import { PrismaClient, User, Address, City, Country } from "@org/database";
import { IUserRepository } from "../../application/repositories/user.repository.interface.js";
import { CountryEntity } from "../../domain/entities/country.entity.js";
import { CityEntity } from "../../domain/entities/city.entity.js";
import { AddressEntity } from "../../domain/entities/address.entity.js";
import { UserEntity } from "../../domain/entities/user.entity.js";

const prisma = new PrismaClient();

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

function toDomainAddress(prismaAddress: Address): AddressEntity {
    return new AddressEntity(
        prismaAddress.id,
        prismaAddress.userId,
        prismaAddress.street,
        prismaAddress.district,
        prismaAddress.cityId,
        prismaAddress.countryId,
        prismaAddress.isDefault,
        prismaAddress.createdAt,
        prismaAddress.updatedAt
    );
}

function toDomainCountry(prismaCountry: Country): CountryEntity {
    return new CountryEntity(
        prismaCountry.id,
        prismaCountry.name,
        prismaCountry.createdAt,
        prismaCountry.updatedAt
    );
}

function toDomainCity(prismaCity: City): CityEntity {
    return new CityEntity(
        prismaCity.id,
        prismaCity.name,
        prismaCity.createdAt,
        prismaCity.updatedAt
    );
}


export class UserRepository implements IUserRepository {

    async findById(id: number): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        return user ? toDomainUser(user) : null;
    }

    async findAll(): Promise<UserEntity[]> {
        const users = await prisma.user.findMany();
        return users.map(toDomainUser);
    }

    async save(user: UserEntity): Promise<UserEntity> {
        const { id, ...data } = user;
        const updated = await prisma.user.update({
            where: { id },
            data: {
                username: data.username,
                email: data.email,
                password: data.password,
                bio: data.bio,
                avatar_url: data.avatarUrl,
                is_verified: data.isVerified,
                is_locked: data.isLocked,
                updatedAt: new Date()
            }
        });
        return toDomainUser(updated);
    }

    async update(id: number, data: Partial<UserEntity>): Promise<UserEntity> {
        const updated = await prisma.user.update({ where: { id }, data: data as any });
        return toDomainUser(updated);
    }


    async delete(id: number): Promise<UserEntity> {
        const deleted = await prisma.user.delete({ where: { id } });
        return toDomainUser(deleted);
    }

    async findAddressesByUserId(userId: number): Promise<AddressEntity[]> {
        const addresses = await prisma.address.findMany({ where: { userId } });
        return addresses.map(toDomainAddress);
    }

    async findAddressById(id: number): Promise<AddressEntity | null> {
        const address = await prisma.address.findUnique({ where: { id } });
        return address ? toDomainAddress(address) : null;
    }


    async createAddress(userId: number, data: Partial<AddressEntity>): Promise<AddressEntity> {
        const created = await prisma.address.create({
            data: { ...data, userId } as any
        });
        return toDomainAddress(created);
    }

    async updateAddress(id: number, data: Partial<AddressEntity>): Promise<AddressEntity> {
        const updated = await prisma.address.update({ where: { id }, data: data as any });
        return toDomainAddress(updated);
    }

    async deleteAddress(id: number): Promise<AddressEntity> {
        const deleted = await prisma.address.delete({ where: { id } });
        return toDomainAddress(deleted);
    }

    async findCountryById(id: number): Promise<CountryEntity | null> {
        const country = await prisma.country.findUnique({ where: { id } });
        return country ? toDomainCountry(country) : null;
    }

    async findCityById(id: number): Promise<CityEntity | null> {
        const city = await prisma.city.findUnique({ where: { id } });
        return city ? toDomainCity(city) : null;
    }


}
