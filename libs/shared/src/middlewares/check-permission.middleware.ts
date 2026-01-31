import { NextFunction, Request, Response } from "express";
import { Action, Resource, PermissionManager } from "../config/permissions.config.js";
import { UnauthorizedError } from "../utils/app-error.js";


export const checkPermission = (resource: Resource, action: Action, isSelf: boolean = false) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.headers["x-user-id"] as any;
            const perms = req.headers["x-user-permissions"] as any;

            const { userId } = req.params;

            if (userId && Number(userId) === Number(id) && isSelf) {
                next();
            }


            if (!PermissionManager.can(BigInt(perms), resource, action)) {
                throw new UnauthorizedError("Access denied");
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
