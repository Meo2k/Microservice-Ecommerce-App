import { User, Address, City, Country } from "@org/database";

/**
 * Domain Repository Interface
 * Defines the contract for data access without implementation details
 */
export interface IUserRepository {
    // User operations
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: number, data: Partial<User>): Promise<User>;
    delete(id: number): Promise<User>;

    // Address operations
    findAddressesByUserId(userId: number): Promise<Address[]>;
    createAddress(userId: number, data: Partial<Address>): Promise<Address>;
    updateAddress(id: number, data: Partial<Address>): Promise<Address>;
    deleteAddress(id: number): Promise<Address>;

    // Lookup operations
    findCountryById(id: number): Promise<Country | null>;
    findCityById(id: number): Promise<City | null>;

    // Permission operations
    getPermissions(userId: number): Promise<bigint>;
}
