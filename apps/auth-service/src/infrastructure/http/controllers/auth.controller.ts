import { Request, Response } from "express";
import { UserEntity } from "../../../domain/entities/user.entity.js";
import {
    RegisterUserUseCase,
    LoginUseCase,
    VerifyOtpUseCase,
    ResendOtpUseCase,
    ChangePasswordUseCase,
    GetMeUseCase,
    RefreshTokenUseCase,
    CreateShopUseCase,
} from "../../../application/use-cases/index.js";


export class AuthController {
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly verifyOtpUseCase: VerifyOtpUseCase,
        private readonly resendOtpUseCase: ResendOtpUseCase,
        private readonly changePasswordUseCase: ChangePasswordUseCase,
        private readonly getMeUseCase: GetMeUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase,
        private readonly createShopUseCase: CreateShopUseCase
    ) { }

    register = async (req: Request, res: Response) => {
        const body = req.body;
        const result = await this.registerUserUseCase.execute(body);
        return res.status(result.status).json(result.metadata);
    };

    login = async (req: Request, res: Response) => {
        const body = req.body;
        const result = await this.loginUseCase.execute(body);

        // Set refresh token as HTTP-only cookie
        res.cookie("refresh_token", result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(result.status).json(result.metadata);
    };

    verifyOtp = async (req: Request, res: Response) => {
        const body = req.body;
        const result = await this.verifyOtpUseCase.execute(body);
        return res.status(result.status).json(result.metadata);
    };

    resendOtp = async (req: Request, res: Response) => {
        const body = req.body;
        const result = await this.resendOtpUseCase.execute(body);
        return res.status(result.status).json(result.metadata);
    };

    changePassword = async (req: Request, res: Response) => {
        const body = req.body;
        const result = await this.changePasswordUseCase.execute(body);
        return res.status(result.status).json(result.metadata);
    };

    getMe = async (req: Request, res: Response) => {
        const id = req.headers["x-user-id"] as any;
        const result = await this.getMeUseCase.execute(id);
        return res.status(result.status).json(result.metadata);
    };

    refreshToken = async (req: Request, res: Response) => {
        const userId = (req as any).user.id;
        const result = await this.refreshTokenUseCase.execute(userId);
        return res.status(result.status).json(result.metadata);
    };

    createShop = async (req: Request, res: Response) => {
        const user = (req as any).user as UserEntity;
        const body = req.body;
        const result = await this.createShopUseCase.execute(user, body);
        return res.status(result.status).json(result.metadata);
    };
}
