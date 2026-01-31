import { prisma } from "@org/database";

import { IAuthRepository } from "../../application/repositories/auth.repository.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { Result } from "@org/shared";


export class AuthRepository implements IAuthRepository {
    private _toDomain(userModel: any): UserEntity {
        const roles = userModel.userRole
            ? userModel.userRole.map((ur: any) => ur.role.name)
            : ['USER'];

        return new UserEntity(
            userModel.id,
            userModel.email,
            userModel.username,
            userModel.avatar_url,
            userModel.bio,
            userModel.password,
            roles,
            userModel.is_verified,
            userModel.is_locked,
            userModel.createdAt,
            userModel.updatedAt
        );
    }

    async findUserById(id: number): Promise<Result<UserEntity | null>> {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                userRole: {
                    include: { role: true }
                }
            }
        });
        return user ? Result.ok(this._toDomain(user)) : Result.ok(null);
    }

    async findUserByEmail(email: string): Promise<Result<UserEntity | null>> {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                userRole: {
                    include: { role: true }
                }
            }
        });
        return user ? Result.ok(this._toDomain(user)) : Result.ok(null);
    }

    async findAllUser(): Promise<Result<UserEntity[]>> {
        const users = await prisma.user.findMany({
            include: {
                userRole: {
                    include: { role: true }
                }
            }
        });
        return Result.ok(users.map(this._toDomain));
    }

    async createUser(userEntity: UserEntity): Promise<Result<UserEntity>> {
        const user = await prisma.user.create({
            data: {
                username: userEntity.username,
                email: userEntity.email,
                password: userEntity.password,
                is_verified: userEntity.isVerified,
                is_locked: userEntity.isLocked,
                userRole: {
                    create: userEntity.roles.map((roleName) => ({
                        role: {
                            connect: { name: roleName }
                        }
                    }))
                }
            },
            include: {
                userRole: {
                    include: { role: true }
                }
            }
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
                // role: user.role, // Removed
                is_verified: user.isVerified,
                is_locked: user.isLocked,
                updatedAt: user.updatedAt
            }
        });
    }

}
