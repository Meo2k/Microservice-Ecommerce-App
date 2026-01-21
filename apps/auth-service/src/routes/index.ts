import { Router } from "express";
import { authController } from "../dependencies";
import { asyncHandler, authenticateRefreshToken, authenticateJwt } from "@org/shared";


export const authRouter = Router()
    .post("/register", asyncHandler(authController.register))
    .post("/send-otp", asyncHandler(authController.sendOtp))
    .post("/verify-otp", asyncHandler(authController.verifyOtp))
    .post("/resend-otp", asyncHandler(authController.resendOtp))
    .post("/login", asyncHandler(authController.login))

    .get("/me", authenticateJwt, asyncHandler(authController.getMe))
    .post("/refresh-token", authenticateRefreshToken, asyncHandler(authController.refreshToken))

    .post("/change-password", authenticateJwt, asyncHandler(authController.changePassword))

//get all user (only for admin)


