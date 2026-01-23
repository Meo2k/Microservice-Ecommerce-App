import { Address, City, Country, User } from "@org/database";
import { UserResponseDto } from "../dtos/user.dto";
import { UpdateUserAddressValidatorType, UpdateUserValidatorType } from "../user.validator";

export interface IUserRepository {
    findUserById(id: number): Promise<User | null>
    getAllUser(): Promise<User[]>
    updateUser(id: number, data: UpdateUserValidatorType): Promise<User>
    deleteUser(id: number): Promise<User>

    getUserAddress(userId: number): Promise<Address[]>
    createUserAddress(userId: number, data: UpdateUserAddressValidatorType): Promise<Address>
    updateUserAddress(id: number, data: UpdateUserAddressValidatorType): Promise<Address>
    deleteUserAddress(id: number): Promise<Address>
    findCountryById(id: number): Promise<Country | null>
    findCityById(id: number): Promise<City | null>

    toUserResponseDto(user: User): UserResponseDto
    getPermissions(userId: number): Promise<bigint>
}