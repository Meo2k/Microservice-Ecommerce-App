import { Result } from "@org/shared";
import { IUserRepository } from "../../domain/repositories/user.repository.interface.js";
import { UpdateUserAddressCommand } from "../../infrastructure/http/validators/user.validator.js";
import { UserError, CountryError, CityError } from "../../domain/errors/user.error.js";

/**
 * Use Case: Update User Address
 */
export class UpdateUserAddressUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(command: UpdateUserAddressCommand): Promise<Result<any>> {
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

        const updatedAddress = await this.userRepository.updateAddress(data.id, data);

        return Result.ok(updatedAddress);
    }
}

