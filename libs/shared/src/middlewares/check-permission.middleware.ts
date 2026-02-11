import { NextFunction, Request, Response } from "express";
import { Action, Resource, PermissionManager } from '../config/permissions.config.js';
import { Result } from '../utils/result.js';
import { ErrorCodes, HTTP_STATUS } from '../config/http.config.js';
import { ErrorMessages } from "../constants/messages.js";


export const checkPermission = (resource: Resource, action: Action, isSelf: boolean = false) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.headers["x-user-id"] as any;
            const perms = req.headers["x-user-permissions"] as any;

            const { userId } = req.params;

            if (userId && Number(userId) === Number(id) && isSelf) {
                next();
                return;
            }


            if (!PermissionManager.can(BigInt(perms), resource, action)) {
                res.status(HTTP_STATUS.FORBIDDEN).json(Result.fail<any>({
                    code: ErrorCodes.ERR_UNAUTHORIZED,
                    message: ErrorMessages.Common.Forbidden,
                }));
                return;
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};
