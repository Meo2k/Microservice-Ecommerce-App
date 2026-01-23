import { UserService } from "./user.service"
import { Request, Response } from "express"
import { updateUserAddressValidator, updateUserValidator } from "./user.validator";

export class UserController {
    constructor(private readonly userService: UserService) {}

    getAllUser = async (req: Request, res: Response) => {
        const result = await this.userService.getAllUser();
        return res.status(result.status).json(result.metadata)
    }

    updateUser = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const body = updateUserValidator.parse(req.body);
        const result = await this.userService.updateUser(Number(userId), body);
        return res.status(result.status).json(result.metadata)
    }

    getUserById = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const result = await this.userService.getUserById(Number(userId));
        return res.status(result.status).json(result.metadata)
    }

    deleteUser = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const result = await this.userService.deleteUser(Number(userId));
        return res.status(result.status).json(result.metadata)
    }

    // for address of user 
    updateUserAddress = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const body = updateUserAddressValidator.parse(req.body);
        const result = await this.userService.updateUserAddress(Number(userId), body);
        return res.status(result.status).json(result.metadata)
    }

    getUserAddress = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const result = await this.userService.getUserAddress(Number(userId));
        return res.status(result.status).json(result.metadata)
    }

    createUserAddress = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const body = updateUserAddressValidator.parse(req.body);
        const result = await this.userService.createUserAddress(Number(userId), body);
        return res.status(result.status).json(result.metadata)
    }

    deleteUserAddress = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const result = await this.userService.deleteUserAddress(Number(userId));
        return res.status(result.status).json(result.metadata)
    }
}