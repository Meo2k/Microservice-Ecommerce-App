import { prisma } from "@org/database"
import { RegisterSchemaType } from "./auth.validator";
import { ConflictError } from "@org/shared";
const registerService = async (body: RegisterSchemaType) => {
    const {username, email, password} = body
    const userExists = await prisma.user.findUnique({ where: { email }})
    if(userExists){
        throw new ConflictError("User already exists")
    }
   
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password,
        }
    })
    return user;
}

export {
    registerService
}