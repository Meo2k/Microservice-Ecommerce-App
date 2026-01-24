/**
 * Domain Entity - User
 * Pure business logic, framework-agnostic
 */
export class UserEntity {
    constructor(
        public readonly id: number,
        public username: string | null,
        public email: string,
        public password: string,
        public avatarUrl: string | null,
        public bio: string | null,
        public isVerified: boolean,
        public isLocked: boolean,
        public role: bigint,
        public readonly createdAt: Date,
        public updatedAt: Date
    ) { }

    // Domain methods
    isActive(): boolean {
        return this.isVerified && !this.isLocked;
    }

    canBeDeleted(): boolean {
        return !this.isLocked;
    }

    updateProfile(username: string | null, bio: string | null, avatarUrl: string | null): void {
        this.username = username;
        this.bio = bio;
        this.avatarUrl = avatarUrl;
        this.updatedAt = new Date();
    }
}
