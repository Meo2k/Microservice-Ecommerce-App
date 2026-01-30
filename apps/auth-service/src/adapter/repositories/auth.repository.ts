import { prisma, User as UserModel} from "@org/database";

import { IAuthRepository } from "../../application/repositories/auth.repository.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { Result } from "@org/shared";


export class AuthRepository implements IAuthRepository {
    private _toDomain(userModel: UserModel): UserEntity {
        return new UserEntity(
            userModel.id,
            userModel.email,
            userModel.username,
            userModel.avatar_url,
            userModel.bio,
            userModel.password,
            userModel.is_verified,
            userModel.is_locked,
            userModel.createdAt,
            userModel.updatedAt
        );
    }

    async findUserById(id: number): Promise<Result<UserEntity | null>> {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                username: true,
                avatar_url: true,
                bio: true,
                password: true,
                is_verified: true,
                is_locked: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return user ? Result.ok(this._toDomain(user)) : Result.ok(null);
    }

    async findUserByEmail(email: string): Promise<Result<UserEntity | null>> {
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                username: true,
                avatar_url: true,
                bio: true,
                password: true,
                is_verified: true,
                is_locked: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return user ? Result.ok(this._toDomain(user)) : Result.ok(null);
    }

    async findAllUser(): Promise<Result<UserEntity[]>> {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                avatar_url: true,
                bio: true,
                password: true,
                is_verified: true,
                is_locked: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return Result.ok(users.map(this._toDomain));
    }

    async createUser(data: any): Promise<Result<UserEntity>> {
        const user = await prisma.user.create({
            data
        });
        return Result.ok(this._toDomain(user));
    }

    async save(user: UserEntity): Promise<void> {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                email: user.email,
                username: user.username,
                avatar_url: user.avatarUrl,
                bio: user.bio,
                password: user.password,
                is_verified: user.isVerified,
                is_locked: user.isLocked,
                updatedAt: user.updatedAt
            }
        });
    }

}
