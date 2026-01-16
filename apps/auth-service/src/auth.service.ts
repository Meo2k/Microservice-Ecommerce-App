import { prisma } from "@org/database"
import { RegisterSchemaType } from "./auth.validator";
const registerService = async (body: RegisterSchemaType) => {
   
    const user = await prisma.user.create({
        data: {
            username: body.username,
            email: body.email,
            password: body.password,
        }
    })
    return user;
    
}

export {
    registerService
}