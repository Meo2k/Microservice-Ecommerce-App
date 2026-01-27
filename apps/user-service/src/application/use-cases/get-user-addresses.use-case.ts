import { HTTP_STATUS, NotFoundError, USER_MESSAGE } from "@org/shared";
import { IUserRepository } from "../../domain/repositories/user.repository.interface.js";

/**
 * Use Case: Get User Addresses
 */
export class GetUserAddressesUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(userId: number) {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundError(USER_MESSAGE.GET_USER.NOT_FOUND);
        }

        const addresses = await this.userRepository.findAddressesByUserId(userId);

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.GET_ADDRESS.SUCCESS,
                address: addresses
            },
        };
    }
}
