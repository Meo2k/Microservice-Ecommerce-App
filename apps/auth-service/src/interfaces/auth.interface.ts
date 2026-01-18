import { User } from "@org/database";

export interface IAuthRepository {
    findUserById(id: number): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    updateUser(where: any, data: any): Promise<User>;
    createUser(data: any): Promise<User>;
}
