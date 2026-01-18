import { User as UserSchemaType } from "@org/database";
import { Exclude, plainToInstance } from "class-transformer";

export class UserResponseDto {
    id!: number;
    username!: string | null;
    email!: string;
    avatar_url!: string | null;
    bio!: string | null;
    createdAt!: Date;
    updatedAt!: Date;

    @Exclude()
    password?: string;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}

export const toUserResponseDto = (user: UserSchemaType): UserResponseDto => {
    return plainToInstance(UserResponseDto, user);
}

