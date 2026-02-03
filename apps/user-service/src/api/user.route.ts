import { Router } from "express";
import { Resource, Action, asyncHandler, validateRequest, updateUserValidator, createUserAddressValidator, updateUserAddressValidator } from "@org/shared/server";

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
            checkPermission(Resource.USER, Action.READ),
            asyncHandler(userController.getAllUser)
        )

        .put(
            "/:userId",
            checkPermission(Resource.USER, Action.UPDATE, true),
            validateRequest(updateUserValidator),
            asyncHandler(userController.updateUser)
        )
        .delete(
            "/:userId",
            checkPermission(Resource.USER, Action.DELETE, true),
            asyncHandler(userController.deleteUser)
        )

        // Address operations
        .get(
            "/:userId/address",
            checkPermission(Resource.USER, Action.READ, true),
            asyncHandler(userController.getUserAddress)
        )
        .post(
            "/:userId/address",
            checkPermission(Resource.USER, Action.CREATE, true),
            validateRequest(createUserAddressValidator),
            asyncHandler(userController.createUserAddress)
        )
        .put(
            "/:userId/address",
            checkPermission(Resource.USER, Action.UPDATE, true),
            validateRequest(updateUserAddressValidator),
            asyncHandler(userController.updateUserAddress)
        )
        .delete(
            "/:userId/address/:addressId",
            checkPermission(Resource.USER, Action.DELETE, true),
            asyncHandler(userController.deleteUserAddress)
        );
};
