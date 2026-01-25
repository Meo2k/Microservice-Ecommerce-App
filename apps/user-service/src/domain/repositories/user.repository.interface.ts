
import { UserEntity } from "../entities/user.entity.js";
import { AddressEntity } from "../entities/address.entity.js";
import { CountryEntity } from "../entities/country.entity.js";
import { CityEntity } from "../entities/city.entity.js";


export interface IUserRepository {
    // User operations
    findById(id: number): Promise<UserEntity | null>;
    findAll(): Promise<UserEntity[]>;
    update(id: number, data: Partial<UserEntity>): Promise<UserEntity>;
    delete(id: number): Promise<UserEntity>;

    // Address operations
    findAddressesByUserId(userId: number): Promise<AddressEntity[]>;
    createAddress(userId: number, data: Partial<AddressEntity>): Promise<AddressEntity>;
    updateAddress(id: number, data: Partial<AddressEntity>): Promise<AddressEntity>;
    deleteAddress(id: number): Promise<AddressEntity>;

    // Lookup operations
    findCountryById(id: number): Promise<CountryEntity | null>;
    findCityById(id: number): Promise<CityEntity | null>;

}
