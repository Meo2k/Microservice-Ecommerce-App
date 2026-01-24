export class CountryEntity {
    constructor(
        public readonly id: number,
        public name: string,
        public readonly createdAt: Date,
        public updatedAt: Date
    ) { }
}