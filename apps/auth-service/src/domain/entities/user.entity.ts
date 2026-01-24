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
        public isVerified: boolean,
        public isLocked: boolean,
        public readonly createdAt: Date,
        public updatedAt: Date
    ) { }

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
