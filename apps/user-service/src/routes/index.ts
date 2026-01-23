import { Router } from "express";
import { authenticateJwt } from "@org/shared";
import { Resource, Action } from "@org/shared";
import { asyncHandler } from "@org/shared";
import { userController } from "../dependencies";
import { checkPermission } from "../dependencies";

export const userRouter = Router()

    //get all user (only for admin)
    .get("/all-user", authenticateJwt, checkPermission(Resource.USER, Action.READ), asyncHandler(userController.getAllUser))

    .put("/:userId", authenticateJwt, checkPermission(Resource.USER, Action.UPDATE, true), asyncHandler(userController.updateUser))
    .get("/:userId", authenticateJwt, checkPermission(Resource.USER, Action.READ, true), asyncHandler(userController.getUserById))
    .delete("/:userId", authenticateJwt, checkPermission(Resource.USER, Action.DELETE, true), asyncHandler(userController.deleteUser))

