import { AuthRepository } from "./repositories/auth.repository";
import { JwtTokenService } from "./repositories/jwt-token.repository";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { createCheckPermission, setupPassport } from "@org/shared";
import { EmailService, OtpService, redis } from "@org/redis";

const authRepo = new AuthRepository();
const tokenService = new JwtTokenService();
const emailService = new EmailService();
const otpService = new OtpService();

export const authService = new AuthService(authRepo, tokenService, emailService, otpService);

setupPassport(authRepo.findUserById);

export const checkPermission = createCheckPermission(
    authRepo.getPermissions.bind(authRepo),
    (key) => redis.get(key) as Promise<string | null>,
    async (key, value, ttl) => { await redis.set(key, value, { ex: ttl }); }
);

export const authController = new AuthController(authService);
