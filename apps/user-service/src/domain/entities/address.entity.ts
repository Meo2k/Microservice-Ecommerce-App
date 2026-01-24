/**
 * Domain Entity - Address
 */
export class AddressEntity {
    constructor(
        public readonly id: number,
        public readonly userId: number,
        public street: string,
        public cityId: number,
        public countryId: number,
        public postalCode: string | null,
        public isDefault: boolean,
        public readonly createdAt: Date,
        public updatedAt: Date
    ) { }

    setAsDefault(): void {
        this.isDefault = true;
        this.updatedAt = new Date();
    }

    update(street: string, cityId: number, countryId: number, postalCode: string | null): void {
        this.street = street;
        this.cityId = cityId;
        this.countryId = countryId;
        this.postalCode = postalCode;
        this.updatedAt = new Date();
    }
}
