/**
 * Shop Domain Entity
 */
export class ShopEntity {
    constructor(
        public readonly id: number,
        public userId: number,
        public name: string,
        public description: string | null,
        public logoUrl: string | null,
        public coverUrl: string | null,
        public isActive: boolean,
        public readonly createdAt: Date,
        public updatedAt: Date
    ) { }

    activate(): void {
        this.isActive = true;
        this.updatedAt = new Date();
    }

    deactivate(): void {
        this.isActive = false;
        this.updatedAt = new Date();
    }

    updateInfo(name: string, description: string | null): void {
        this.name = name;
        this.description = description;
        this.updatedAt = new Date();
    }
}
