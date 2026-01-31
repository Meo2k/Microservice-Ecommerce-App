import { UserEntity } from "../../domain/entities/user.entity";
import { Result } from "@org/shared";


export interface IAuthRepository {

    findUserById(id: number): Promise<Result<UserEntity | null>>;
    findUserByEmail(email: string): Promise<Result<UserEntity | null>>;
    findAllUser(): Promise<Result<UserEntity[]>>;
    createUser(user: UserEntity): Promise<Result<UserEntity>>;
    save(user: UserEntity): Promise<void>;

}


