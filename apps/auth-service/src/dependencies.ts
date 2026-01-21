import { AuthRepository } from "./repositories/auth.repository";
import { JwtTokenService } from "./repositories/jwt-token.repository";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { setupPassport } from "@org/shared";
import { EmailService, OtpService } from "@org/redis";

const authRepo = new AuthRepository();
const tokenService = new JwtTokenService();
const emailService = new EmailService();
const otpService = new OtpService();

export const authService = new AuthService(authRepo, tokenService, emailService, otpService);

setupPassport(authRepo.findUserById);

export const authController = new AuthController(authService);
