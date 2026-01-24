export class AddressEntity {
    constructor(
        public readonly id: number,
        public userId: number,
        public street: string,
        public district: string,
        public cityId: number,
        public countryId: number,
        public isDefault: boolean,
        public readonly createdAt: Date,
        public updatedAt: Date
    ) { }

    setAsDefault(): void {
        this.isDefault = true;
        this.updatedAt = new Date();
    }

    update(street: string, district: string, cityId: number, countryId: number): void {
        this.street = street;
        this.district = district;
        this.cityId = cityId;
        this.countryId = countryId;
        this.updatedAt = new Date();
    }
}
