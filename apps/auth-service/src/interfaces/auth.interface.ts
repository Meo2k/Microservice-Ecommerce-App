import { User } from "@org/database";
import { UserResponseDto } from "../dtos/auth.dto";

export interface IAuthRepository {
    findUserById(id: number): Promise<User | null>;
    findAllUser(): Promise<User[]>;
    findUserByEmail(email: string): Promise<User | null>;
    updateUser(where: any, data: any): Promise<User>;
    createUser(data: any): Promise<User>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    toUserResponseDto(user: User): UserResponseDto;
}
