
import { UserEntity } from "../../domain/entities/user.entity.js";
import { AddressEntity } from "../../domain/entities/address.entity.js";
import { CountryEntity } from "../../domain/entities/country.entity.js";
import { CityEntity } from "../../domain/entities/city.entity.js";


export interface IUserRepository {
    // User operations
    findById(id: number): Promise<UserEntity | null>;
    findAll(): Promise<UserEntity[]>;
    save(user: UserEntity): Promise<UserEntity>;  // Save entity changes
    update(id: number, data: Partial<UserEntity>): Promise<UserEntity>;
    delete(id: number): Promise<UserEntity>;

    // Address operations
    findAddressesByUserId(userId: number): Promise<AddressEntity[]>;
    findAddressById(id: number): Promise<AddressEntity | null>;
    createAddress(userId: number, data: Partial<AddressEntity>): Promise<AddressEntity>;
    updateAddress(id: number, data: Partial<AddressEntity>): Promise<AddressEntity>;
    deleteAddress(id: number): Promise<AddressEntity>;

    // Lookup operations
    findCountryById(id: number): Promise<CountryEntity | null>;
    findCityById(id: number): Promise<CityEntity | null>;

}
