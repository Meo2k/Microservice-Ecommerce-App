import { User } from "@org/database";
import { UserResponseDto } from "../dtos/user.dto";
import { UpdateUserValidatorType } from "../user.validator";

export interface IUserRepository {
    findUserById(id: number): Promise<User | null>
    getAllUser(): Promise<User[]>
    updateUser(id: number, data: UpdateUserValidatorType): Promise<User>

    toUserResponseDto(user: User): UserResponseDto
    getPermissions(userId: number): Promise<bigint>
}