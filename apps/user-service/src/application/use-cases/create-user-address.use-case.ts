import { BadRequestError, ENV, HTTP_STATUS, NotFoundError, USER_MESSAGE } from "@org/shared";
import { IUserRepository } from "../../domain/repositories/user.repository.interface.js";
import { CreateAddressDto } from "../dtos/index.js";

/**
 * Use Case: Create User Address
 */
export class CreateUserAddressUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(userId: number, data: CreateAddressDto) {
        // Verify user exists
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError(USER_MESSAGE.UPDATE_USER.NOT_FOUND);
        }

        // Verify country exists
        const country = await this.userRepository.findCountryById(data.countryId);
        if (!country) {
            throw new NotFoundError(USER_MESSAGE.UPDATE_ADDRESS.NOT_FOUND);
        }

        // Verify city exists
        const city = await this.userRepository.findCityById(data.cityId);
        if (!city) {
            throw new NotFoundError(USER_MESSAGE.UPDATE_ADDRESS.NOT_FOUND);
        }

        // Check address limit
        const addresses = await this.userRepository.findAddressesByUserId(userId);
        if (addresses.length >= Number(ENV.MAX_ADDRESS)) {
            throw new BadRequestError(USER_MESSAGE.UPDATE_ADDRESS.MAX_ADDRESS);
        }

        const createdAddress = await this.userRepository.createAddress(userId, data);

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.CREATE_ADDRESS.SUCCESS,
                address: createdAddress
            },
        };
    }
}
