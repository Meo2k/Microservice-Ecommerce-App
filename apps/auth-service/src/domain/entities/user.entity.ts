/**
 * User Domain Entity
 * Pure business logic, framework-agnostic
 */
export class UserEntity {
    constructor(
        public readonly id: number,
        public email: string,
        public username: string | null,
        public avatarUrl: string | null,
        public bio: string | null,
        public password: string,
        public roles: string[],
        public isVerified: boolean,
        public isLocked: boolean,
        public readonly createdAt: Date,
        public updatedAt: Date
    ) { }

    static create(username: string | null | undefined, email: string, passwordHash: string, roles: string[]): UserEntity {
        return new UserEntity(
            0, // Temporary ID
            email,
            username ?? null,
            null, // avatar
            null, // bio
            passwordHash,
            roles,
            false, // isVerified
            false, // isLocked
            new Date(),
            new Date()
        );
    }

    isActive(): boolean {
        return this.isVerified && !this.isLocked;
    }

    canLogin(): boolean {
        return this.isActive();
    }

    verify(): void {
        this.isVerified = true;
        this.updatedAt = new Date();
    }

    lock(): void {
        this.isLocked = true;
        this.updatedAt = new Date();
    }

    unlock(): void {
        this.isLocked = false;
        this.updatedAt = new Date();
    }

    updatePassword(newPassword: string): void {
        this.password = newPassword;
        this.updatedAt = new Date();
    }
}
