import { Result } from "@org/shared";
import { IUserRepository } from "../../domain/repositories/user.repository.interface.js";
import { DeleteUserAddressCommand } from "../../infrastructure/http/validators/user.validator.js";
import { UserError } from "../../domain/errors/user.error.js";

/**
 * Use Case: Delete User Address
 */
export class DeleteUserAddressUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(command: DeleteUserAddressCommand): Promise<Result<any>> {
        const userId = command.params.userId;
        const addressId = command.params.addressId;

        const user = await this.userRepository.findById(userId);
        if (!user) {
            return Result.fail(UserError.NotFound);
        }

        const deletedAddress = await this.userRepository.deleteAddress(addressId);

        return Result.ok(deletedAddress);
    }
}

