import { UserEntity } from "../../domain/entities/user.entity.js";
import { Exclude } from "class-transformer";

/**
 * DTO for User Response
 * Transforms Domain Entity to API response
 */
export class UserResponseDto {
    id!: number;
    username!: string | null;
    email!: string;
    avatar_url!: string | null;
    bio!: string | null;
    createdAt!: Date;
    updatedAt!: Date;

    @Exclude() password?: string;
    @Exclude() is_verified?: boolean;
    @Exclude() is_locked?: boolean;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}

/**
 * Transform Domain Entity to Response DTO
 * Excludes sensitive fields
 */
export const toUserResponseDto = (userEntity: UserEntity): UserResponseDto => {
    return new UserResponseDto({
        id: userEntity.id,
        username: userEntity.username,
        email: userEntity.email,
        avatar_url: userEntity.avatarUrl,
        bio: userEntity.bio,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt
        // Excludes: password, isVerified, isLocked
    });
};
