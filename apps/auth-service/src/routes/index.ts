import { Express, Router } from "express";
import { registerController, loginController } from "../auth.controller";
import { asyncHandler } from "@org/shared";

const router = (app: Express)=>{
    app.use("/", authRouter)
}

const authRouter = Router()
.post("/register", asyncHandler(registerController))
.post("/login", asyncHandler(loginController))

export default router
