import { Request, Response } from "express";
import {
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserAddressesUseCase,
    CreateUserAddressUseCase,
    UpdateUserAddressUseCase,
    DeleteUserAddressUseCase,
} from "../../../application/use-cases/index.js";
import {
    updateUserValidator,
    createUserAddressValidator,
    updateUserAddressValidator
} from "../validators/user.validator.js";

/**
 * HTTP Controller for User operations
 * Infrastructure layer - handles HTTP requests/responses
 */
export class UserController {
    constructor(
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly getUserAddressesUseCase: GetUserAddressesUseCase,
        private readonly createUserAddressUseCase: CreateUserAddressUseCase,
        private readonly updateUserAddressUseCase: UpdateUserAddressUseCase,
        private readonly deleteUserAddressUseCase: DeleteUserAddressUseCase
    ) { }

    getAllUser = async (req: Request, res: Response) => {
        const result = await this.getAllUsersUseCase.execute();
        return res.status(result.status).json(result.metadata);
    };

    getUserById = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const result = await this.getUserByIdUseCase.execute(Number(userId));
        return res.status(result.status).json(result.metadata);
    };

    updateUser = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const body = updateUserValidator.parse(req.body);
        const result = await this.updateUserUseCase.execute(Number(userId), body);
        return res.status(result.status).json(result.metadata);
    };

    deleteUser = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const result = await this.deleteUserUseCase.execute(Number(userId));
        return res.status(result.status).json(result.metadata);
    };

    // Address operations
    getUserAddress = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const result = await this.getUserAddressesUseCase.execute(Number(userId));
        return res.status(result.status).json(result.metadata);
    };

    createUserAddress = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const body = createUserAddressValidator.parse(req.body);
        const result = await this.createUserAddressUseCase.execute(Number(userId), body);
        return res.status(result.status).json(result.metadata);
    };

    updateUserAddress = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const body = updateUserAddressValidator.parse(req.body);
        const result = await this.updateUserAddressUseCase.execute(Number(userId), body);
        return res.status(result.status).json(result.metadata);
    };

    deleteUserAddress = async (req: Request, res: Response) => {
        const { userId, addressId } = req.params;
        const result = await this.deleteUserAddressUseCase.execute(
            Number(userId),
            Number(addressId)
        );
        return res.status(result.status).json(result.metadata);
    };
}
