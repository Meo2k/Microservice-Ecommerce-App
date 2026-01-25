import { Router } from "express";
import { authenticateJwt, Resource, Action, asyncHandler, validateRequest } from "@org/shared";
import {
    updateUserValidator,
    createUserAddressValidator,
    updateUserAddressValidator
} from "../validators/user.validator.js";

/**
 * User Routes
 * Infrastructure layer - HTTP routing
 */
export const createUserRouter = (
    userController: any,
    checkPermission: any
): Router => {
    return Router()
        // Get all users (admin only)
        .get(
            "/all",
            authenticateJwt,
            checkPermission(Resource.USER, Action.READ),
            asyncHandler(userController.getAllUser)
        )

        // User operations
        .get(
            "/:userId",
            authenticateJwt,
            checkPermission(Resource.USER, Action.READ, true),
            asyncHandler(userController.getUserById)
        )
        .put(
            "/:userId",
            authenticateJwt,
            checkPermission(Resource.USER, Action.UPDATE, true),
            validateRequest(updateUserValidator),
            asyncHandler(userController.updateUser)
        )
        .delete(
            "/:userId",
            authenticateJwt,
            checkPermission(Resource.USER, Action.DELETE, true),
            asyncHandler(userController.deleteUser)
        )

        // Address operations
        .get(
            "/:userId/address",
            authenticateJwt,
            checkPermission(Resource.USER, Action.READ, true),
            asyncHandler(userController.getUserAddress)
        )
        .post(
            "/:userId/address",
            authenticateJwt,
            checkPermission(Resource.USER, Action.CREATE, true),
            validateRequest(createUserAddressValidator),
            asyncHandler(userController.createUserAddress)
        )
        .put(
            "/:userId/address",
            authenticateJwt,
            checkPermission(Resource.USER, Action.UPDATE, true),
            validateRequest(updateUserAddressValidator),
            asyncHandler(userController.updateUserAddress)
        )
        .delete(
            "/:userId/address/:addressId",
            authenticateJwt,
            checkPermission(Resource.USER, Action.DELETE, true),
            asyncHandler(userController.deleteUserAddress)
        );
};
