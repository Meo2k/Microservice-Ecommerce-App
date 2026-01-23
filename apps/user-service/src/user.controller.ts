import { UserService } from "./user.service"
import { Request, Response } from "express"
import { updateUserValidator } from "./user.validator";

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
}