export class ShopEntity {
    constructor(
        public id: number,
        public name: string,
        public description: string | null,
        public logo_url: string | null,
        public cover_url: string | null,
        public is_active: boolean,
        public userId: number,
        public createdAt: Date,
        public updatedAt: Date
    ) { }
}
