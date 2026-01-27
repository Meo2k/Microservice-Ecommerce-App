import { setupPassport, checkPermission } from "@org/shared";

// Domain
import { IAuthRepository } from "../../domain/repositories/auth.repository.interface.js";

// Application
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
    CreateShopUseCase,
} from "../../application/use-cases/index.js";

// Infrastructure
import { PrismaAuthRepository } from "../repositories/prisma-auth.repository.js";
import { TokenService } from "../services/token.service.js";
import { PasswordService } from "../services/password.service.js";
import { RedisEmailService, RedisOtpService } from "../services/redis.service.js";
import { AuthController } from "../http/controllers/auth.controller.js";


class DIContainer {
    // Repositories
    private authRepository: IAuthRepository;

    // Services
    private tokenService: ITokenService;
    private passwordService: IPasswordService;
    private emailService: IEmailService;
    private otpService: IOtpService;

    // Use Cases
    private registerUserUseCase: RegisterUserUseCase;
    private loginUseCase: LoginUseCase;
    private verifyOtpUseCase: VerifyOtpUseCase;
    private resendOtpUseCase: ResendOtpUseCase;
    private changePasswordUseCase: ChangePasswordUseCase;
    private getMeUseCase: GetMeUseCase;
    private refreshTokenUseCase: RefreshTokenUseCase;
    private createShopUseCase: CreateShopUseCase;

    // Controllers
    public authController: AuthController;

    // Middleware
    public checkPermission: any;

    constructor() {
        // Initialize repositories
        this.authRepository = new PrismaAuthRepository();

        // Initialize services
        this.tokenService = new TokenService();
        this.passwordService = new PasswordService();
        this.emailService = new RedisEmailService();
        this.otpService = new RedisOtpService();

        // Initialize use cases
        this.registerUserUseCase = new RegisterUserUseCase(
            this.authRepository,
            this.emailService,
            this.otpService,
        );

        this.loginUseCase = new LoginUseCase(
            this.authRepository,
            this.tokenService, // Use TokenService instead of TokenRepository
            this.passwordService // Add PasswordService
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

        this.createShopUseCase = new CreateShopUseCase(this.authRepository);

        // Initialize controller
        this.authController = new AuthController(
            this.registerUserUseCase,
            this.loginUseCase,
            this.verifyOtpUseCase,
            this.resendOtpUseCase,
            this.changePasswordUseCase,
            this.getMeUseCase,
            this.refreshTokenUseCase,
            this.createShopUseCase
        );

        // Setup middleware
        setupPassport(this.authRepository.findUserById.bind(this.authRepository));

        this.checkPermission = checkPermission;
    }

    getAuthController(): AuthController {
        return this.authController;
    }

    getCheckPermission(): any {
        return this.checkPermission;
    }
}

// Export singleton instance
export const container = new DIContainer();
