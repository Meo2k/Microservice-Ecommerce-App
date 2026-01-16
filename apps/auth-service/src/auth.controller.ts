import { registerService } from "./auth.service";
import { Request, Response } from "express";

const registerController = async(req: Request, res: Response)=>{
    try {
        console.log("req.body : ", req.body)
        const {username, email, password} = req.body;
        const result = await registerService(username, email, password);
        return res.status(200).json({
            ...result
        })
    } catch (e) {
        console.log("Error : ", e )
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export {
    registerController
}
