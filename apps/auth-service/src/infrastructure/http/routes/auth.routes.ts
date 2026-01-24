import { Router } from "express";
import { asyncHandler, authenticateRefreshToken, authenticateJwt } from "@org/shared";

/**
 * Auth Routes
 * Infrastructure layer - HTTP routing
 */
export const createAuthRouter = (authController: any): Router => {
    return Router()
        // Public routes
        .post("/register", asyncHandler(authController.register))
        .post("/login", asyncHandler(authController.login))
        .post("/verify-otp", asyncHandler(authController.verifyOtp))
        .post("/resend-otp", asyncHandler(authController.resendOtp))

        // Protected routes
        .get("/me", authenticateJwt, asyncHandler(authController.getMe))
        .post("/refresh-token", authenticateRefreshToken, asyncHandler(authController.refreshToken))
        .post("/change-password", asyncHandler(authController.changePassword))
        .post("/register-seller", authenticateJwt, asyncHandler(authController.createShop));
};
