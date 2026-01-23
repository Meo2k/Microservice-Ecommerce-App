import { Request, Response } from "express";
import { changePasswordSchema, loginSchema, registerSchema, registerSellerSchema, resendOtpSchema, verifyOtpSchema } from "./auth.validator";
import { ENV } from "@org/shared";
import { AuthService } from "./auth.service";
import ms from "ms";

export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    /**
     * @description Register a new user, send email to verify
     */
    register = async (req: Request, res: Response) => {
        const body = registerSchema.parse(req.body);
        const result = await this.authService.register(body);
        return res.status(result.status).json(result)
    }

    registerSeller = async (req: Request, res: Response) => {
        const user = req.user!
        const body = registerSellerSchema.parse(req.body);
        const result = await this.authService.createShop(user, body);
        return res.status(result.status).json(result)
    }


    /**
     * @description Login a user, apply to cookie and sliding expired
     */
    login = async (req: Request, res: Response) => {
        const body = loginSchema.parse(req.body);
        const result = await this.authService.login(body);
        return res.status(result.status)
            .cookie("refresh_token", result.refreshToken, {
                path: "/",
                httpOnly: true,
                secure: false,
                sameSite: "none",
                maxAge: +ms(ENV.REFRESH_TOKEN_EXPIRED as unknown as number),
            })
            .json(result.metadata)
    }

    verifyOtp = async (req: Request, res: Response) => {
        const body = verifyOtpSchema.parse(req.body);
        const result = await this.authService.verifyOtp(body);
        return res.status(result.status).json(result.metadata)
    }

    resendOtp = async (req: Request, res: Response) => {
        const body = resendOtpSchema.parse(req.body);
        const result = await this.authService.resendOtp(body);
        return res.status(result.status).json(result.metadata)
    }

    getMe = async (req: Request, res: Response) => {
        const user = req.user!
        const result = await this.authService.getMe(user)
        return res.status(result.status).json(result.metadata)
    }
    refreshToken = async (req: Request, res: Response) => {
        const { id } = req.user!;
        const result = await this.authService.refreshToken(String(id));
        return res.status(result.status).json(result.metadata)
    }
    changePassword = async (req: Request, res: Response) => {
        const body = changePasswordSchema.parse(req.body);
        const result = await this.authService.changePassword(body);
        return res.status(result.status).json(result.metadata)
    }

}


