import { getUserPermissions, User } from "@org/database";
import { IUserRepository } from "../interfaces/user.interface";
import { prisma } from "@org/database";
import { UserResponseDto } from "../dtos/user.dto";
import { UpdateUserValidatorType } from "../user.validator";

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

    toUserResponseDto = (user: User): UserResponseDto => {
        return this.toUserResponseDto(user)
    }
    getPermissions(userId: number): Promise<bigint> {
        return getUserPermissions(userId);
    }
}