import { checkPermission } from "@org/shared/server";
import { ENV } from "@org/shared";
import { KafkaClient } from "@org/message-broker";

import { IAuthRepository } from "../../application/repositories/auth.repository.interface.js";
import { IOtpRepository } from "../../application/repositories/otp.repository.interface.js";

import {
    ITokenService,
    IPasswordService,
} from "../../application/services/index.js";
import { IAuthMessagePublisher } from "../../application/services/message-publisher.interface.js";
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
import { RedisOtpRepository } from "../repositories/redis-otp.repository.js";
import { TokenService } from "../services/token.service.js";
import { PasswordService } from "../services/password.service.js";
import { AuthMessagePublisher } from "../services/auth-message-publisher.service.js";
import { AuthController } from "../controllers/auth.controller.js";


class DIContainer {
    private authRepository: IAuthRepository;
    private otpRepository: IOtpRepository;

    private tokenService: ITokenService;
    private passwordService: IPasswordService;
    private messagePublisher: IAuthMessagePublisher;
    private kafkaClient: KafkaClient;

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
        this.otpRepository = new RedisOtpRepository();

        this.tokenService = new TokenService();
        this.passwordService = new PasswordService();

        // Initialize Kafka client (local Docker - no SSL/SASL)
        this.kafkaClient = KafkaClient.getInstance({
            brokers: ENV.KAFKA_BROKERS.split(','),
            clientId: ENV.KAFKA_CLIENT_ID,
            username: ENV.KAFKA_USERNAME,
            password: ENV.KAFKA_PASSWORD,
            ssl: false, // No SSL for local Docker Kafka
        });
        this.messagePublisher = new AuthMessagePublisher(this.kafkaClient);

        this.registerUserUseCase = new RegisterUserUseCase(
            this.authRepository,
            this.otpRepository,
            this.messagePublisher,
            this.passwordService
        );

        this.loginUseCase = new LoginUseCase(
            this.authRepository,
            this.tokenService,
            this.passwordService
        );

        this.verifyOtpUseCase = new VerifyOtpUseCase(
            this.authRepository,
            this.otpRepository
        );

        this.resendOtpUseCase = new ResendOtpUseCase(
            this.authRepository,
            this.otpRepository,
            this.messagePublisher
        );

        this.changePasswordUseCase = new ChangePasswordUseCase(
            this.authRepository,
            this.otpRepository,
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
