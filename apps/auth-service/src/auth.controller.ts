import { Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.validator";
import { PrismaAuthRepository } from "./repositories/auth.repository";
import { JwtTokenService } from "./repositories/jwt-token.repository";
import { AuthService } from "./auth.service";
import ms from "ms";
import { ENV } from "@org/shared";
import { EmailService } from "@org/redis";

const authRepo = new PrismaAuthRepository();
const tokenService = new JwtTokenService();
const emailService = new EmailService();


const authService = new AuthService(authRepo, tokenService, emailService);

/**
 * @description Register a new user, send email to verify
 */
const registerController = async(req: Request, res: Response)=>{
    const body = registerSchema.parse(req.body);
    const result = await authService.register(body);
    return res.status(result.status).json(result)
}

/**
 * @description Login a user, apply to cookie and sliding expired
 */
const loginController = async(req: Request, res: Response)=>{
    const body = loginSchema.parse(req.body);
    const result = await authService.login(body);
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

export {
    registerController,
    loginController
}
