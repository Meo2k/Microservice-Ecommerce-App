import { prisma } from "@org/database"
import { RegisterSchemaType } from "./auth.validator";
import { AUTH_MESSAGE, ConflictError, HTTP_STATUS } from "@org/shared";


const registerService = async (body: RegisterSchemaType) => {
    const {username, email, password} = body
    const userExists = await prisma.user.findUnique({ where: { email }})
    if(userExists){
        throw new ConflictError(AUTH_MESSAGE.REGISTER.CONFLICT)
    }
   
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password,
        }
    })
    return {
        status: HTTP_STATUS.CREATED, 
        message: AUTH_MESSAGE.REGISTER.SUCCESS, 
        user, 
        
    };
}

export {
    registerService
}