import { User as UserSchemaType } from "@org/database"
import { GetMeSchemaType, LoginSchemaType, RegisterSchemaType } from "./auth.validator";
import { AUTH_MESSAGE, comparePassword, ConflictError, HTTP_STATUS, NotFoundError, UnauthorizedError } from "@org/shared";
import { toUserResponseDto } from "./dtos/auth.dto";
import { IAuthRepository } from "./interfaces/auth.interface";
import { ITokenService } from "./interfaces/jwt-token.interface";





export class AuthService {
    constructor(
        private authRepo: IAuthRepository,
        private tokenService: ITokenService
    ) {}

    async register(body: RegisterSchemaType) {
        const { username, email, password } = body
        const userExists = await this.authRepo.findUserByEmail(email)

        if (userExists) {
            throw new ConflictError(AUTH_MESSAGE.REGISTER.CONFLICT)
        }

        await this.authRepo.createUser({
            data: {
                username,
                email,
                password,
            }
        })

        return {
            status: HTTP_STATUS.CREATED,
            metadata: {
                message: AUTH_MESSAGE.REGISTER.SUCCESS,
            },
        };
    }

    async login (body: LoginSchemaType) {
        const { email, password } = body
        const user = await this.authRepo.findUserByEmail(email) as UserSchemaType // Safe now as we fixed client

        if (!user) {
            throw new NotFoundError(AUTH_MESSAGE.LOGIN.NOT_FOUND)
        }

        const isPasswordValid = await comparePassword(password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedError(AUTH_MESSAGE.LOGIN.UNAUTHORIZED)
        }

        const accessToken = this.tokenService.signAccess({ id: user.id })
        const refreshToken = this.tokenService.signRefresh({ id: user.id })
    
        return {
            status: HTTP_STATUS.OK,
            refreshToken,
            metadata: {
                message: AUTH_MESSAGE.LOGIN.SUCCESS,
                accessToken,
            },
        };
    }

    async getMe(getMeSchema: GetMeSchemaType){
        const {id} = getMeSchema.user
        const user = await this.authRepo.findUserById(id)
        if (!user) {
            throw new NotFoundError(AUTH_MESSAGE.GET_ME.NOT_FOUND)
        }
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.GET_ME.SUCCESS,
                user: toUserResponseDto(user)
            },
        };
    }
}