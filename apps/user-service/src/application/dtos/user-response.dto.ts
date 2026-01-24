import { User } from "@org/database";
import { Exclude, plainToInstance } from "class-transformer";

/**
 * DTO for User Response
 * Used to shape data going out to clients
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
    @Exclude() role?: bigint;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}

export const toUserResponseDto = (user: User): UserResponseDto => {
    return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: false });
};
