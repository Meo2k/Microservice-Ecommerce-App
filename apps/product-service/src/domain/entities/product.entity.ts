export class ProductEntity {
    constructor(
        public readonly id: string,
        public name: string,
        public basePrice: number,
        public stock: number,

        public attributes: object[],
        public images: string[],
        public description: string | null,

        public discount: number,
        public categoryId: number,
        public shopId: number,
        public readonly createdAt: Date,
        public updatedAt: Date | null
    ) {}

    updateProduct(data: Partial<Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>>): void {
        Object.assign(this, data);
        this.updatedAt = new Date();
    }
}