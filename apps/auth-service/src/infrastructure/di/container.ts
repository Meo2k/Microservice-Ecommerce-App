import { setupPassport, createCheckPermission } from "@org/shared";
import { redis } from "@org/redis";

// Domain
import { IAuthRepository, ITokenRepository } from "../../domain/repositories/auth.repository.interface.js";

// Application
import { IEmailService, IOtpService } from "../../application/ports/external-services.port.js";
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
import { JwtTokenRepository } from "../repositories/jwt-token.repository.js";
import { RedisEmailServiceAdapter, RedisOtpServiceAdapter } from "../adapters/redis-service.adapter.js";
import { AuthController } from "../http/controllers/auth.controller.js";

/**
 * Dependency Injection Container for Auth Service
 * Wires up all dependencies following Clean Architecture principles
 */
class DIContainer {
    // Repositories (Infrastructure -> Domain)
    private authRepository: IAuthRepository;
    private tokenRepository: ITokenRepository;

    // External Services (Infrastructure -> Application Ports)
    private emailService: IEmailService;
    private otpService: IOtpService;

    // Use Cases (Application)
    private registerUserUseCase: RegisterUserUseCase;
    private loginUseCase: LoginUseCase;
    private verifyOtpUseCase: VerifyOtpUseCase;
    private resendOtpUseCase: ResendOtpUseCase;
    private changePasswordUseCase: ChangePasswordUseCase;
    private getMeUseCase: GetMeUseCase;
    private refreshTokenUseCase: RefreshTokenUseCase;
    private createShopUseCase: CreateShopUseCase;

    // Controllers (Infrastructure)
    public authController: AuthController;

    // Middleware
    public checkPermission: any;

    constructor() {
        // Initialize repositories
        this.authRepository = new PrismaAuthRepository();
        this.tokenRepository = new JwtTokenRepository();

        // Initialize external service adapters
        this.emailService = new RedisEmailServiceAdapter();
        this.otpService = new RedisOtpServiceAdapter();

        // Initialize use cases
        this.registerUserUseCase = new RegisterUserUseCase(
            this.authRepository,
            this.emailService,
            this.otpService
        );

        this.loginUseCase = new LoginUseCase(
            this.authRepository,
            this.tokenRepository
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
            this.otpService
        );

        this.getMeUseCase = new GetMeUseCase();

        this.refreshTokenUseCase = new RefreshTokenUseCase(this.tokenRepository);

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

        this.checkPermission = createCheckPermission(
            this.authRepository.getPermissions.bind(this.authRepository),
            (key) => redis.get(key) as Promise<string | null>,
            async (key, value, ttl) => { await redis.set(key, value, { ex: ttl }); }
        );
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
