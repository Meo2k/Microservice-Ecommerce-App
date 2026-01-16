import { Express, Router } from "express";
import { registerController } from "../auth.controller";

const router = (app: Express)=>{
    app.use("/", authRouter)
}

const authRouter = Router()
.post("/register", registerController)

export default router
