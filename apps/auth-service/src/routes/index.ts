import { Express, Router } from "express";
import { authController } from "../auth.controller";
import { asyncHandler } from "@org/shared";

const router = (app: Express)=>{
    app.use("/", authRouter)
}

const authRouter = Router()
.post("/register", asyncHandler(authController.register))
.post("/verify-otp", asyncHandler(authController.verifyOtp))
.post("/resend-otp", asyncHandler(authController.resendOtp))
.post("/login", asyncHandler(authController.login))

// middleware 
.get("/me", asyncHandler(authController.getMe))

export default router
