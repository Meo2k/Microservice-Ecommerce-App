import { setupPassport } from "@org/shared";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./user.service";
import { createCheckPermission } from "@org/shared";
import { redis } from "@org/redis";
import { UserController } from "./user.controller";

const userRepo = new UserRepository();


export const userService = new UserService(userRepo);

setupPassport(userRepo.findUserById);

export const checkPermission = createCheckPermission(
    userRepo.getPermissions.bind(userRepo),
    (key) => redis.get(key) as Promise<string | null>,
    async (key, value, ttl) => { await redis.set(key, value, { ex: ttl }); }
);

export const userController = new UserController(userService);
