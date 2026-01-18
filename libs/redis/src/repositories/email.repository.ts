
import { ENV , generateOTP, OTP_MESSAGE, sendEmail, ValidationError} from "@org/shared"
import { IEmailService } from '../interfaces/email.interface'
import { redis } from "../redis"



export class EmailService implements IEmailService {
    constructor() {}

    async sendOtpToEmail(to: string, templateName: string ) {
        const otp = generateOTP()
        const otpExpired = Number(ENV.OTP_EXPIRED)

        if (await redis.get(`otp_cooldown:${to}`)) {
            throw new ValidationError(OTP_MESSAGE.COOLDOWN)
        }

        await sendEmail(to, "Xác thực Email", "Xác thực Email", templateName, { otp, otpExpired: otpExpired / 60 })

        const p = redis.pipeline();

        p.set(`otp:${to}`, otp, {ex: otpExpired}); // 5 minutes (expired)
        p.set(`otp_cooldown:${to}`, "true", {ex: Number(ENV.OTP_COOLDOWN)}) // 1 minute (cooldown)

        await p.exec()


    }

}

