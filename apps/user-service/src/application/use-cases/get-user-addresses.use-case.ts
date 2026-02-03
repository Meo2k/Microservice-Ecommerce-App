import { Result } from "@org/shared";
import { IUserRepository } from "../../application/repositories/user.repository.interface.js";
import { GetUserAddressesCommand } from "@org/shared";
import { UserError } from "../../domain/errors/user.error.js";

/**
 * Use Case: Get User Addresses
 */
export class GetUserAddressesUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(command: GetUserAddressesCommand): Promise<Result<any[]>> {
        const userId = command.params.userId;

        const user = await this.userRepository.findById(userId);

        if (!user) {
            return Result.fail(UserError.NotFound);
        }

        const addresses = await this.userRepository.findAddressesByUserId(userId);

        return Result.ok(addresses);
    }
}

