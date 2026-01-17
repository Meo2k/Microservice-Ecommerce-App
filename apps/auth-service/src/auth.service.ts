import { prisma, User as UserSchemaType } from "@org/database"
import { LoginSchemaType, RegisterSchemaType } from "./auth.validator";
import { AUTH_MESSAGE, comparePassword, ConflictError, HTTP_STATUS, NotFoundError, UnauthorizedError } from "@org/shared";
import { toUserResponseDto } from "./dtos/auth.dto";

const registerService = async (body: RegisterSchemaType) => {
    const { username, email, password } = body
    const userExists = await prisma.user.findUnique({ where: { email } })

    if (userExists) {
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
        user: toUserResponseDto(user),
    };
}

const loginService = async (body: LoginSchemaType) => {
    const { email, password } = body
    const user = await prisma.user.findUnique({ where: { email } }) as UserSchemaType // Safe now as we fixed client

    if (!user) {
        throw new NotFoundError(AUTH_MESSAGE.LOGIN.NOT_FOUND)
    }

    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
        throw new UnauthorizedError(AUTH_MESSAGE.LOGIN.UNAUTHORIZED)
    }

    return {
        status: HTTP_STATUS.OK,
        message: AUTH_MESSAGE.LOGIN.SUCCESS,
        user: toUserResponseDto(user),
    };
}

export {
    registerService,
    loginService
}