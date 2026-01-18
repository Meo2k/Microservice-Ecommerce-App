import { Request, Response } from "express";
import { GetMeSchemaType, loginSchema, registerSchema, resendOtpSchema, verifyOtpSchema } from "./auth.validator";
import { PrismaAuthRepository } from "./repositories/auth.repository";
import { JwtTokenService } from "./repositories/jwt-token.repository";
import { AuthService } from "./auth.service";
import ms from "ms";
import { AUTH_MESSAGE, ENV, HTTP_STATUS } from "@org/shared";
import { EmailService } from "@org/redis";
import { toUserResponseDto } from "./dtos/auth.dto";
import { OtpService } from "@org/redis";

class AuthController {
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
        const user = (req as unknown as GetMeSchemaType).user
        return res.status(HTTP_STATUS.OK).json({
            message: AUTH_MESSAGE.GET_ME.SUCCESS,
            user: toUserResponseDto(user)
        })
    }
}


const authRepo = new PrismaAuthRepository();
const tokenService = new JwtTokenService();
const emailService = new EmailService();
const otpService = new OtpService();
const authService = new AuthService(authRepo, tokenService, emailService, otpService);

export const authController = new AuthController(authService)


