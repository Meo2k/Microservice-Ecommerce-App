import { setupPassport, createCheckPermission } from "@org/shared";
import { redis } from "@org/redis";

// Domain
import { IUserRepository } from "../../domain/repositories/user.repository.interface.js";

// Application
import {
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserAddressesUseCase,
    CreateUserAddressUseCase,
    UpdateUserAddressUseCase,
    DeleteUserAddressUseCase,
} from "../../application/use-cases/index.js";

// Infrastructure
import { PrismaUserRepository } from "../database/repositories/prisma-user.repository.js";
import { UserController } from "../http/controllers/user.controller.js";

/**
 * Dependency Injection Container
 * Wires up all dependencies following Clean Architecture principles
 * Dependencies flow: Infrastructure -> Application -> Domain
 */
class DIContainer {
    // Repositories (Infrastructure -> Domain)
    private userRepository: IUserRepository;

    // Use Cases (Application)
    private getAllUsersUseCase: GetAllUsersUseCase;
    private getUserByIdUseCase: GetUserByIdUseCase;
    private updateUserUseCase: UpdateUserUseCase;
    private deleteUserUseCase: DeleteUserUseCase;
    private getUserAddressesUseCase: GetUserAddressesUseCase;
    private createUserAddressUseCase: CreateUserAddressUseCase;
    private updateUserAddressUseCase: UpdateUserAddressUseCase;
    private deleteUserAddressUseCase: DeleteUserAddressUseCase;

    // Controllers (Infrastructure)
    public userController: UserController;

    // Middleware
    public checkPermission: any;

    constructor() {
        // Initialize repository
        this.userRepository = new PrismaUserRepository();

        // Initialize use cases
        this.getAllUsersUseCase = new GetAllUsersUseCase(this.userRepository);
        this.getUserByIdUseCase = new GetUserByIdUseCase(this.userRepository);
        this.updateUserUseCase = new UpdateUserUseCase(this.userRepository);
        this.deleteUserUseCase = new DeleteUserUseCase(this.userRepository);
        this.getUserAddressesUseCase = new GetUserAddressesUseCase(this.userRepository);
        this.createUserAddressUseCase = new CreateUserAddressUseCase(this.userRepository);
        this.updateUserAddressUseCase = new UpdateUserAddressUseCase(this.userRepository);
        this.deleteUserAddressUseCase = new DeleteUserAddressUseCase(this.userRepository);

        // Initialize controller
        this.userController = new UserController(
            this.getAllUsersUseCase,
            this.getUserByIdUseCase,
            this.updateUserUseCase,
            this.deleteUserUseCase,
            this.getUserAddressesUseCase,
            this.createUserAddressUseCase,
            this.updateUserAddressUseCase,
            this.deleteUserAddressUseCase
        );

        // Setup middleware
        setupPassport(this.userRepository.findById.bind(this.userRepository));

        this.checkPermission = createCheckPermission(
            this.userRepository.getPermissions.bind(this.userRepository),
            (key) => redis.get(key) as Promise<string | null>,
            async (key, value, ttl) => { await redis.set(key, value, { ex: ttl }); }
        );
    }

    getUserController(): UserController {
        return this.userController;
    }

    getCheckPermission(): any {
        return this.checkPermission;
    }
}

// Export singleton instance
export const container = new DIContainer();
