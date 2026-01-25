import { HTTP_STATUS, USER_MESSAGE } from "@org/shared";
import { IUserRepository } from "../../domain/repositories/user.repository.interface.js";

/**
 * Use Case: Delete User Address
 */
export class DeleteUserAddressUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(userId: number, addressId: number) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error(USER_MESSAGE.UPDATE_USER.NOT_FOUND);
        }

        const deletedAddress = await this.userRepository.deleteAddress(addressId);

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.DELETE_ADDRESS.SUCCESS,
                address: deletedAddress
            },
        };
    }
}
