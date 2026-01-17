import { registerService } from "./auth.service";
import { Request, Response } from "express";
import { registerSchema } from "./auth.validator";

const registerController = async(req: Request, res: Response)=>{
    const body = registerSchema.parse(req.body);
    const response = await registerService(body);
    return res.status(response.status).json({
        ...response, 
        status: undefined
    })
}

export {
    registerController
}
