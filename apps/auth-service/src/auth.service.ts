import { User as UserSchemaType } from "@org/database"
import { ChangePasswordSchemaType, LoginSchemaType, RegisterSchemaType, ResendOtpSchemaType, VerifyOtpSchemaType } from "./auth.validator";
import { AUTH_MESSAGE, ConflictError, HTTP_STATUS, NotFoundError, UnauthorizedError } from "@org/shared";
import { IAuthRepository } from "./interfaces/auth.interface";
import { ITokenRepository } from "./interfaces/jwt-token.interface";
import { IEmailRepository, ITemporaryRepository } from "@org/redis";
import { IOtpRepository } from "@org/redis";

export class AuthService {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly tokenRepo: ITokenRepository, 
        private readonly emailRepo: IEmailRepository, 
        private readonly otpRepo: IOtpRepository, 
    ) {}

    register = async (body: RegisterSchemaType) => {
        const { username, email, password } = body
        const userExists = await this.authRepo.findUserByEmail(email)

        if (userExists) {
            throw new ConflictError(AUTH_MESSAGE.REGISTER.CONFLICT)
        }

        await this.otpRepo.checkOtpRestrictions(email)
        await this.emailRepo.sendOtpToEmail(email, "otp.template")

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

    login = async (body: LoginSchemaType) => {
        const { email, password } = body
        const user = await this.authRepo.findUserByEmail(email) as UserSchemaType 

        if (!user) {
            throw new NotFoundError(AUTH_MESSAGE.LOGIN.NOT_FOUND)
        }

        const isPasswordValid = await this.authRepo.comparePassword(password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedError(AUTH_MESSAGE.LOGIN.UNAUTHORIZED)
        }


        const accessToken = this.tokenRepo.signAccess({ sub: user.id })
        const refreshToken = this.tokenRepo.signRefresh({ sub: user.id })
  
        return {
            status: HTTP_STATUS.OK,
            refreshToken,
            metadata: {
                message: AUTH_MESSAGE.LOGIN.SUCCESS,
                accessToken,
            },
        };
    }

    /**
     * @description private :  verify OTP 
     */
    private async _validateOtpOrThrow(email: string, code: string) {

        await this.otpRepo.checkOtpRestrictions(email)
        const user = await this.authRepo.findUserByEmail(email) as UserSchemaType;
        if (!user) {
            throw new NotFoundError(AUTH_MESSAGE.VALIDATE_OTP.NOT_FOUND);
        }

        const storedData = await this.otpRepo.findOtpByEmail(email);
        if (!storedData.otp) {
            throw new UnauthorizedError(AUTH_MESSAGE.VALIDATE_OTP.INVALID);
        }

        if (Number(code) !== Number(storedData.otp)) {
            await this.otpRepo.handleFailedAttempts(email);
        }
        return user;
    }

    verifyOtp = async (body: VerifyOtpSchemaType) => {
        const { email, otp } = body
        
        const user = await this._validateOtpOrThrow(email, otp)

        await this.authRepo.updateUser( { id: user.id }, { is_verified: true })
        await this.otpRepo.resetOTP(email)
    
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.VERIFY_OTP.SUCCESS,
            },
        };
    }

    resendOtp = async (body: ResendOtpSchemaType) => {
        const { email } = body
        
        await this.otpRepo.checkOtpRestrictions(email)
        const user = await this.authRepo.findUserByEmail(email) as UserSchemaType // Safe now as we fixed client

        if (!user) {
            throw new NotFoundError(AUTH_MESSAGE.RESEND_OTP.NOT_FOUND)
        }

        await this.emailRepo.sendOtpToEmail(email, "otp.template")

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.RESEND_OTP.SUCCESS,
            },
        };
    }

    getMe = async (user: UserSchemaType) => {
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.GET_ME.SUCCESS,
                user: this.authRepo.toUserResponseDto(user)
            },
        }
    }

    refreshToken = async (id: string) => {
        const accessToken = this.tokenRepo.signAccess({ sub: id })
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.REFRESH_TOKEN.SUCCESS,
                accessToken,
            },
        };
    }
        

    changePassword = async (body: ChangePasswordSchemaType) => {
        const { code, email, password } = body
        const user = await this._validateOtpOrThrow(email, code)
        
        await this.authRepo.updateUser({ id: user.id }, { password })
        await this.otpRepo.resetOTP(email)

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.CHANGE_PASSWORD.SUCCESS,
            },
        };
        
    }

    getAllUser = async () => {
        const users = await this.authRepo.findAllUser()
        const usersDto = users.map(user => this.authRepo.toUserResponseDto(user))
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.GET_ALL_USER.SUCCESS,
                users: usersDto
            },
        }
    }
}