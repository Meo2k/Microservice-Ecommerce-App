import { User } from "@org/database";

export interface IAuthRepository {
    findUserById(id: number): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    createUser(data: any): Promise<User>;
}
