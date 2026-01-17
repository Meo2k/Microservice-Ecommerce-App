import { loginService, registerService } from "./auth.service";
import { Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.validator";

const registerController = async(req: Request, res: Response)=>{
    const body = registerSchema.parse(req.body);
    const {status, ...response} = await registerService(body);
    return res.status(status).json(response)
}

const loginController = async(req: Request, res: Response)=>{
    const body = loginSchema.parse(req.body);
    const {status, ...response} = await loginService(body);
    return res.status(status).json(response)
}

export {
    registerController,
    loginController
}
