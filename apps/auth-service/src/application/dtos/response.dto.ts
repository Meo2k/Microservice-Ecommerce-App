import { UserEntity } from "../../domain/entities/user.entity";

export class UserResponse {
    constructor(
        public id: number,
        public username: string | null,
        public email: string,
        public isActive: boolean,
    ) { }
}

export function toResponse(user: UserEntity): UserResponse {
    return new UserResponse(
        user.id,
        user.username,
        user.email,
        user.isActive(),
    );
}