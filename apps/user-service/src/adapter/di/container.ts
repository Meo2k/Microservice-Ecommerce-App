import { checkPermission } from "@org/shared";

// Domain
import { IUserRepository } from "../../application/repositories/user.repository.interface.js";

// Application
import {
    GetAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserAddressesUseCase,
    CreateUserAddressUseCase,
    UpdateUserAddressUseCase,
    DeleteUserAddressUseCase,
} from "../../application/use-cases/index.js";

// Infrastructure
import { UserRepository } from "../repositories/prisma-user.repository.js";
import { UserController } from "../controllers/user.controller.js";


class DIContainer {
    // Repositories (Infrastructure -> Domain)
    private userRepository: IUserRepository;

    // Services

    // Use Cases (Application)
    private getAllUsersUseCase: GetAllUsersUseCase;
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
        this.userRepository = new UserRepository();

        // Initialize use cases
        this.getAllUsersUseCase = new GetAllUsersUseCase(this.userRepository);
        this.updateUserUseCase = new UpdateUserUseCase(this.userRepository);
        this.deleteUserUseCase = new DeleteUserUseCase(this.userRepository);
        this.getUserAddressesUseCase = new GetUserAddressesUseCase(this.userRepository);
        this.createUserAddressUseCase = new CreateUserAddressUseCase(this.userRepository);
        this.updateUserAddressUseCase = new UpdateUserAddressUseCase(this.userRepository);
        this.deleteUserAddressUseCase = new DeleteUserAddressUseCase(this.userRepository);

        // Initialize controller
        this.userController = new UserController(
            this.getAllUsersUseCase,
            this.updateUserUseCase,
            this.deleteUserUseCase,
            this.getUserAddressesUseCase,
            this.createUserAddressUseCase,
            this.updateUserAddressUseCase,
            this.deleteUserAddressUseCase
        );

        this.checkPermission = checkPermission;
    }

    getUserController(): UserController {
        return this.userController;
    }

    getCheckPermission(): any {
        return this.checkPermission;
    }
}

export const container = new DIContainer();
