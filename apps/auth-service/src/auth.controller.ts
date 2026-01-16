import { registerService } from "./auth.service";
import { Request, Response } from "express";
import { registerSchema } from "./auth.validator";

const registerController = async(req: Request, res: Response)=>{
    const body = registerSchema.parse(req.body);
    const result = await registerService(body);
    return res.status(200).json({
        ...result
    })
}

export {
    registerController
}
