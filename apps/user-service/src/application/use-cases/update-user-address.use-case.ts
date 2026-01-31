import { Result } from "@org/shared";
import { IUserRepository } from "../../application/repositories/user.repository.interface.js";
import { UpdateUserAddressCommand } from "../../api/user.validator.js";
import { UserError, AddressError, CountryError, CityError } from "../../domain/errors/user.error.js";

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

        // Verify address exists and belongs to user
        const address = await this.userRepository.findAddressById(data.id);
        if (!address) {
            return Result.fail(AddressError.NotFound);
        }

        if (address.userId !== userId) {
            return Result.fail(UserError.NotFound); // Or Forbidden if available, for now keeping generic or specific
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

        // Domain update
        address.update(data.street, data.district ?? "", data.cityId, data.countryId);
        if (data.isDefault) {
            address.setAsDefault();
        }

        // Persist
        // Note: updateAddress takes Partial<AddressEntity>, so passing address entity is compatible
        const updatedAddress = await this.userRepository.updateAddress(address.id, address);

        return Result.ok(updatedAddress);
    }
}

