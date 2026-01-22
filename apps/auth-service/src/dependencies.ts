import { AuthRepository } from "./repositories/auth.repository";
import { JwtTokenRepository } from "./repositories/jwt-token.repository";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { createCheckPermission, setupPassport } from "@org/shared";
import { EmailRepository, OtpRepository, redis } from "@org/redis";
import { TemporaryRepository } from "@org/redis";

const authRepo = new AuthRepository();
const tokenRepo = new JwtTokenRepository();
const emailRepo = new EmailRepository();
const otpRepo = new OtpRepository();
//const temporaryRepo = new TemporaryRepository()

export const authService = new AuthService(authRepo, tokenRepo, emailRepo, otpRepo);

setupPassport(authRepo.findUserById);

export const checkPermission = createCheckPermission(
    authRepo.getPermissions.bind(authRepo),
    (key) => redis.get(key) as Promise<string | null>,
    async (key, value, ttl) => { await redis.set(key, value, { ex: ttl }); }
);

export const authController = new AuthController(authService);
