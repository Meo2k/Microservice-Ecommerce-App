import { NextFunction, Request, Response } from "express";
import { Action, Resource, PermissionManager } from "../config/permissions.config.js";
import { UnauthorizedError } from "../utils/app-error.js";

type FetchPermissionsFn = (userId: number) => Promise<bigint>;
type GetCacheFn = (key: string) => Promise<string | null>;
type SetCacheFn = (key: string, value: string, ttl: number) => Promise<void>;

export const createCheckPermission = (
    fetchPermissions: FetchPermissionsFn,
    getCache: GetCacheFn,
    setCache: SetCacheFn
) => {
    return (resource: Resource, action: Action, isSelf: boolean = false) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.user!;
                const { userId } = req.params;
                let perm: bigint;

                if (userId && Number(userId) === Number(id) && isSelf) {
                    next();
                }

                const userPerm = await getCache(`user_perm:${id}`);

                if (userPerm) {
                    perm = BigInt(userPerm);
                } else {
                    perm = await fetchPermissions(Number(id));
                    await setCache(`user_perm:${id}`, perm.toString(), 3600); // Cache for 1 hour
                }

                if (!PermissionManager.can(perm, resource, action)) {
                    throw new UnauthorizedError("Access denied");
                }

                next();
            } catch (error) {
                next(error);
            }
        };
    };
};