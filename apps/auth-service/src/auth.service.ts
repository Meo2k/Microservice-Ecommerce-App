import { prisma } from "@org/database"
const registerService = async (username: string, email: string, password: string) => {
    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password,
            }
        })
        return user;
    } catch (e) {
        console.log("Error : ", e)
        throw e;
    }
}

export {
    registerService
}