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

    canBeDeleted(): boolean {
        return !this.isActive();
    }

    updateProfile(username: string | null, bio: string | null, avatarUrl: string | null): void {
        this.username = username;
        this.bio = bio;
        this.avatarUrl = avatarUrl;
        this.updatedAt = new Date();
    }
}
