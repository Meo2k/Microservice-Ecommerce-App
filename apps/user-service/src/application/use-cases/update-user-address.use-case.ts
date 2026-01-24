import { HTTP_STATUS, USER_MESSAGE } from "@org/shared";
import { IUserRepository } from "../../domain/repositories/user.repository.interface.js";
import { UpdateAddressDto } from "../dtos/index.js";

/**
 * Use Case: Update User Address
 */
export class UpdateUserAddressUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(userId: number, data: UpdateAddressDto) {
        // Verify user exists
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error(USER_MESSAGE.UPDATE_USER.NOT_FOUND);
        }

        // Verify country exists
        const country = await this.userRepository.findCountryById(data.countryId);
        if (!country) {
            throw new Error(USER_MESSAGE.UPDATE_ADDRESS.NOT_FOUND);
        }

        // Verify city exists
        const city = await this.userRepository.findCityById(data.cityId);
        if (!city) {
            throw new Error(USER_MESSAGE.UPDATE_ADDRESS.NOT_FOUND);
        }

        const updatedAddress = await this.userRepository.updateAddress(data.id, data);

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.UPDATE_ADDRESS.SUCCESS,
                address: updatedAddress
            },
        };
    }
}
