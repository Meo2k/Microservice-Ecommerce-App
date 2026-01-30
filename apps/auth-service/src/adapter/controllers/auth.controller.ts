import { Request, Response } from "express";
import { UserEntity } from "../../domain/entities/user.entity.js";
import {
    RegisterUserUseCase,
    LoginUseCase,
    VerifyOtpUseCase,
    ResendOtpUseCase,
    ChangePasswordUseCase,
    GetMeUseCase,
    RefreshTokenUseCase,
} from "../../application/use-cases/index.js";
import { HTTP_STATUS } from "libs/shared/src/config/http.config.js";
import { AUTH_MESSAGE } from "libs/shared/src/config/response-message.config.js";


export class AuthController {
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly verifyOtpUseCase: VerifyOtpUseCase,
        private readonly resendOtpUseCase: ResendOtpUseCase,
        private readonly changePasswordUseCase: ChangePasswordUseCase,
        private readonly getMeUseCase: GetMeUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase,
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

        return res.status(result.status)
        .cookie("refresh_token", result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .json(result.metadata);
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
        if (!result.isSuccess) {
            return res.status(result.error.status!).json(result.error);
        }
        return res.status(HTTP_STATUS.OK).json({
            message: AUTH_MESSAGE.CHANGE_PASSWORD.SUCCESS,
            data: result.value,
        });
    };

    getMe = async (req: Request, res: Response) => {
        const id = req.headers["x-user-id"] as any;
        const result = await this.getMeUseCase.execute(id);
        if (!result.isSuccess) {
            return res.status(result.error.status!).json(result.error);
        }
        return res.status(HTTP_STATUS.OK).json({
            message: AUTH_MESSAGE.GET_ME.SUCCESS,
            data: result.value,
        });
    };

    refreshToken = async (req: Request, res: Response) => {
        const userId = req.headers["x-user-id"] as string;
        const result = await this.refreshTokenUseCase.execute(userId);
        return res.status(result.status).json(result.metadata);
    };

}
