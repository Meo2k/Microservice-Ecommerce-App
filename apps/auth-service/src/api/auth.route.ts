import { Router } from "express";
import {
    asyncHandler,
    authenticateRefreshToken,
    validateRequest,
    registerValidator,
    loginValidator,
    verifyOtpValidator,
    resendOtpValidator,
    changePasswordValidator,
    registerSellerValidator
} from "@org/shared";


export const createAuthRouter = (authController: any): Router => {
    return Router()
        // Public routes
        .post("/register", validateRequest(registerValidator), asyncHandler(authController.register))
        .post("/login", validateRequest(loginValidator), asyncHandler(authController.login))
        .post("/verify-otp", validateRequest(verifyOtpValidator), asyncHandler(authController.verifyOtp))
        .post("/resend-otp", validateRequest(resendOtpValidator), asyncHandler(authController.resendOtp))

        // Protected routes
        .get("/me", asyncHandler(authController.getMe))
        .post("/refresh-token", authenticateRefreshToken, asyncHandler(authController.refreshToken))
        .post("/change-password", validateRequest(changePasswordValidator), asyncHandler(authController.changePassword))
        .post("/register-seller", validateRequest(registerSellerValidator), asyncHandler(authController.createShop));
};
