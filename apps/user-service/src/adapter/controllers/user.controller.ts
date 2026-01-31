import { Request, Response } from "express";
import {
    GetAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserAddressesUseCase,
    CreateUserAddressUseCase,
    UpdateUserAddressUseCase,
    DeleteUserAddressUseCase,
} from "../../application/use-cases/index.js";
import { BaseController } from "./base.controller.js";
import { HTTP_STATUS } from "@org/shared";


/**
 * HTTP Controller for User operations
 * Infrastructure layer - handles HTTP requests/responses
 */
export class UserController extends BaseController {
    constructor(
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly getUserAddressesUseCase: GetUserAddressesUseCase,
        private readonly createUserAddressUseCase: CreateUserAddressUseCase,
        private readonly updateUserAddressUseCase: UpdateUserAddressUseCase,
        private readonly deleteUserAddressUseCase: DeleteUserAddressUseCase
    ) {
        super();
    }

    getAllUser = async (req: Request, res: Response) => {
        const result = await this.getAllUsersUseCase.execute();
        this.handleResult(result, res, HTTP_STATUS.OK);
    };

    updateUser = async (req: Request, res: Response) => {
        const result = await this.updateUserUseCase.execute(req as any);
        this.handleResult(result, res, HTTP_STATUS.OK);
    };

    deleteUser = async (req: Request, res: Response) => {
        const result = await this.deleteUserUseCase.execute(req as any);
        this.handleResult(result, res, HTTP_STATUS.OK);
    };

    // Address operations
    getUserAddress = async (req: Request, res: Response) => {
        const result = await this.getUserAddressesUseCase.execute(req as any);
        this.handleResult(result, res, HTTP_STATUS.OK);
    };

    createUserAddress = async (req: Request, res: Response) => {
        const result = await this.createUserAddressUseCase.execute(req as any);
        this.handleResult(result, res, HTTP_STATUS.CREATED);
    };

    updateUserAddress = async (req: Request, res: Response) => {
        const result = await this.updateUserAddressUseCase.execute(req as any);
        this.handleResult(result, res, HTTP_STATUS.OK);
    };

    deleteUserAddress = async (req: Request, res: Response) => {
        const result = await this.deleteUserAddressUseCase.execute(req as any);
        this.handleResult(result, res, HTTP_STATUS.OK);
    };
}

