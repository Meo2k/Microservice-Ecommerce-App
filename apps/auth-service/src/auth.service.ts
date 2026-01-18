import { User as UserSchemaType } from "@org/database"
import { LoginSchemaType, RegisterSchemaType, ResendOtpSchemaType, VerifyOtpSchemaType } from "./auth.validator";
import { AUTH_MESSAGE, comparePassword, ConflictError, HTTP_STATUS, NotFoundError, UnauthorizedError } from "@org/shared";
import { IAuthRepository } from "./interfaces/auth.interface";
import { ITokenService } from "./interfaces/jwt-token.interface";
import { IEmailService } from "@org/redis";
import { IOtpService } from "@org/redis";


export class AuthService {
    constructor(
        private authRepo: IAuthRepository,
        private tokenService: ITokenService, 
        private emailService: IEmailService, 
        private otpService: IOtpService
    ) {}

    async register(body: RegisterSchemaType) {
        const { username, email, password } = body
        const userExists = await this.authRepo.findUserByEmail(email)

        if (userExists) {
            throw new ConflictError(AUTH_MESSAGE.REGISTER.CONFLICT)
        }

        await this.otpService.checkOtpRestrictions(email)
        await this.emailService.sendOtpToEmail(email, "otp.template")

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
        const user = await this.authRepo.findUserByEmail(email) as UserSchemaType 

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

    async verifyOtp(body: VerifyOtpSchemaType) {
        const { email, otp } = body
        
        const user = await this.authRepo.findUserByEmail(email) as UserSchemaType
        if (!user) {
            throw new NotFoundError(AUTH_MESSAGE.VERIFY_OTP.NOT_FOUND)
        }

        const storedData = await this.otpService.findOtpByEmail(email)

        if (!storedData.otp) {
            throw new UnauthorizedError(AUTH_MESSAGE.VERIFY_OTP.INVALID)
        }

        if (otp !== storedData.otp) {
            this.otpService.handleFailedAttempts(email)
        }

        await this.authRepo.updateUser( { id: user.id }, { is_verified: true })
        await this.otpService.resetOTP(email)
    
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.VERIFY_OTP.SUCCESS,
            },
        };
    }

    async resendOtp(body: ResendOtpSchemaType) {
        const { email } = body
        const user = await this.authRepo.findUserByEmail(email) as UserSchemaType // Safe now as we fixed client

        if (!user) {
            throw new NotFoundError(AUTH_MESSAGE.RESEND_OTP.NOT_FOUND)
        }

        const storedData = await this.otpService.findOtpByEmail(email)

        if (!storedData.otp) {
            throw new UnauthorizedError(AUTH_MESSAGE.RESEND_OTP.INVALID)
        }

        await this.emailService.sendOtpToEmail(email, "otp.template")

        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: AUTH_MESSAGE.RESEND_OTP.SUCCESS,
            },
        };
    }

}