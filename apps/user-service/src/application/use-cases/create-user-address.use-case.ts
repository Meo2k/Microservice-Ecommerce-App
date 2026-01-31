import { ENV, Result } from "@org/shared";
import { IUserRepository } from "../../application/repositories/user.repository.interface.js";
import { CreateUserAddressCommand } from "../../api/user.validator.js";
import { UserError, AddressError, CountryError, CityError } from "../../domain/errors/user.error.js";

/**
 * Use Case: Create User Address
 */
export class CreateUserAddressUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(command: CreateUserAddressCommand): Promise<Result<any>> {
        const userId = command.params.userId;
        const data = command.body;

        // Verify user exists
        const user = await this.userRepository.findById(userId);
        if (!user) {
            return Result.fail(UserError.NotFound);
        }

        // Verify country exists
        const country = await this.userRepository.findCountryById(data.countryId);
        if (!country) {
            return Result.fail(CountryError.NotFound);
        }

        // Verify city exists
        const city = await this.userRepository.findCityById(data.cityId);
        if (!city) {
            return Result.fail(CityError.NotFound);
        }

        // Check address limit
        const addresses = await this.userRepository.findAddressesByUserId(userId);
        if (addresses.length >= Number(ENV.MAX_ADDRESS)) {
            return Result.fail(AddressError.MaxAddressReached);
        }

        const createdAddress = await this.userRepository.createAddress(userId, data);

        return Result.ok(createdAddress);
    }
}

