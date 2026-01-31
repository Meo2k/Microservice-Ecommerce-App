import { checkPermission } from "@org/shared";

import { IAuthRepository } from "../../application/repositories/auth.repository.interface.js";

import {
    ITokenService,
    IPasswordService,
} from "../../application/services/index.js";
import { IEmailService, IOtpService } from "../../application/services/external.js";
import {
    RegisterUserUseCase,
    LoginUseCase,
    VerifyOtpUseCase,
    ResendOtpUseCase,
    ChangePasswordUseCase,
    GetMeUseCase,
    RefreshTokenUseCase,
} from "../../application/use-cases/index.js";

import { AuthRepository } from "../repositories/auth.repository.js";
import { TokenService } from "../services/token.service.js";
import { PasswordService } from "../services/password.service.js";
import { RedisEmailService, RedisOtpService } from "../services/redis.service.js";
import { AuthController } from "../controllers/auth.controller.js";


class DIContainer {
    private authRepository: IAuthRepository;

    private tokenService: ITokenService;
    private passwordService: IPasswordService;
    private emailService: IEmailService;
    private otpService: IOtpService;

    private registerUserUseCase: RegisterUserUseCase;
    private loginUseCase: LoginUseCase;
    private verifyOtpUseCase: VerifyOtpUseCase;
    private resendOtpUseCase: ResendOtpUseCase;
    private changePasswordUseCase: ChangePasswordUseCase;
    private getMeUseCase: GetMeUseCase;
    private refreshTokenUseCase: RefreshTokenUseCase;

    public authController: AuthController;

    public checkPermission: any;

    constructor() {
        this.authRepository = new AuthRepository();

        this.tokenService = new TokenService();
        this.passwordService = new PasswordService();
        this.emailService = new RedisEmailService();
        this.otpService = new RedisOtpService();

        this.registerUserUseCase = new RegisterUserUseCase(
            this.authRepository,
            this.emailService,
            this.otpService,
            this.passwordService
        );

        this.loginUseCase = new LoginUseCase(
            this.authRepository,
            this.tokenService,
            this.passwordService
        );

        this.verifyOtpUseCase = new VerifyOtpUseCase(
            this.authRepository,
            this.otpService
        );

        this.resendOtpUseCase = new ResendOtpUseCase(
            this.authRepository,
            this.emailService,
            this.otpService
        );

        this.changePasswordUseCase = new ChangePasswordUseCase(
            this.authRepository,
            this.otpService,
        );

        this.getMeUseCase = new GetMeUseCase(this.authRepository);

        this.refreshTokenUseCase = new RefreshTokenUseCase(this.tokenService);


        this.authController = new AuthController(
            this.registerUserUseCase,
            this.loginUseCase,
            this.verifyOtpUseCase,
            this.resendOtpUseCase,
            this.changePasswordUseCase,
            this.getMeUseCase,
            this.refreshTokenUseCase,
        );

        this.checkPermission = checkPermission;
    }

    getAuthController(): AuthController {
        return this.authController;
    }

    getCheckPermission(): any {
        return this.checkPermission;
    }
}

export const container = new DIContainer();
