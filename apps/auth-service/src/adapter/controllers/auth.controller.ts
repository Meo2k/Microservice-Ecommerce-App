import { Request, Response } from "express";
import {
    RegisterUserUseCase,
    LoginUseCase,
    VerifyOtpUseCase,
    ResendOtpUseCase,
    ChangePasswordUseCase,
    GetMeUseCase,
    RefreshTokenUseCase,
} from "../../application/use-cases/index.js";
import { HTTP_STATUS } from "@org/shared/server";
import { BaseController } from "./base.controller.js";


export class AuthController extends BaseController {
    constructor(

        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly verifyOtpUseCase: VerifyOtpUseCase,
        private readonly resendOtpUseCase: ResendOtpUseCase,
        private readonly changePasswordUseCase: ChangePasswordUseCase,
        private readonly getMeUseCase: GetMeUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase,
    ) { super() }

    register = async (req: Request, res: Response) => {
        const result = await this.registerUserUseCase.execute(req as any);
        this.handleResult(result, res, HTTP_STATUS.CREATED);
    };

    login = async (req: Request, res: Response) => {
        const result = await this.loginUseCase.execute(req);

        this.handleResultWithCookie(result, res, HTTP_STATUS.OK, "refresh_token");
    };

    verifyOtp = async (req: Request, res: Response) => {
        const result = await this.verifyOtpUseCase.execute(req as any);
        this.handleResult(result, res, HTTP_STATUS.OK);
    };

    resendOtp = async (req: Request, res: Response) => {
        const result = await this.resendOtpUseCase.execute(req as any);
        this.handleResult(result, res, HTTP_STATUS.OK);
    };

    changePassword = async (req: Request, res: Response) => {
        const result = await this.changePasswordUseCase.execute(req);
        this.handleResult(result, res, HTTP_STATUS.OK);
    };

    getMe = async (req: Request, res: Response) => {
        const id = req.headers["x-user-id"] as any;
        const result = await this.getMeUseCase.execute(id);
        this.handleResult(result, res, HTTP_STATUS.OK);
    };

    refreshToken = async (req: Request, res: Response) => {
        const userId = req.headers["x-user-id"] as string;
        const result = await this.refreshTokenUseCase.execute(userId);
        this.handleResult(result, res, HTTP_STATUS.OK);
    };

}
