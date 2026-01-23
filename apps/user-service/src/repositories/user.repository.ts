import { Address, City, Country, getUserPermissions, User } from "@org/database";
import { IUserRepository } from "../interfaces/user.interface";
import { prisma } from "@org/database";
import { UserResponseDto } from "../dtos/user.dto";
import { UpdateUserAddressValidatorType, UpdateUserValidatorType } from "../user.validator";

export class UserRepository implements IUserRepository {
    findUserById(id: number): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } })
    }
    getAllUser = async (): Promise<User[]> => {
        const users = await prisma.user.findMany()
        return users
    }
    updateUser = async (id: number, data: UpdateUserValidatorType): Promise<User> => {
        const user = await prisma.user.update({ where: { id }, data })
        return user
    }
    deleteUser = async (id: number): Promise<User> => {
        const user = await prisma.user.delete({ where: { id } })
        return user
    }

    updateUserAddress = async (id: number, data: UpdateUserAddressValidatorType): Promise<Address> => {
        const address = await prisma.address.update({ where: { id }, data })
        return address
    }
    getUserAddress = async (userId: number): Promise<Address[]> => {
        const address = await prisma.address.findMany({ where: { userId } })
        return address
    }
    deleteUserAddress = async (id: number): Promise<Address> => {
        const address = await prisma.address.delete({ where: { id } })
        return address
    }
    createUserAddress = async (userId: number, data: UpdateUserAddressValidatorType): Promise<Address> => {
        const address = await prisma.address.create({ data: { ...data, userId } })
        return address
    }
    findCountryById = async (id: number): Promise<Country | null> => {
        const country = await prisma.country.findUnique({ where: { id } })
        return country
    }
    findCityById = async (id: number): Promise<City | null> => {
        const city = await prisma.city.findUnique({ where: { id } })
        return city
    }

    toUserResponseDto = (user: User): UserResponseDto => {
        return this.toUserResponseDto(user)
    }
    getPermissions(userId: number): Promise<bigint> {
        return getUserPermissions(userId);
    }
}