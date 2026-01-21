
import { ENV } from "./env.config.js"

export const AUTH_MESSAGE = {
    REGISTER: {
        SUCCESS: "User registered successfully",
        CONFLICT: "User already exists"
    },
    LOGIN: {
        SUCCESS: "User logged in successfully",
        NOT_FOUND: "User not found",
        UNAUTHORIZED: "Invalid credentials"
    },
    GET_ME: {
        SUCCESS: "User fetched successfully",
        NOT_FOUND: "User not found"
    },
    SEND_OTP: {
        SUCCESS: "OTP sent successfully",
    },
    VALIDATE_OTP: {
        INVALID: "Invalid OTP or have been expired. Please try again.",
        NOT_FOUND: "User not found"
    },
    VERIFY_OTP: {
        SUCCESS: "OTP verified successfully",
    },
    RESEND_OTP: {
        SUCCESS: "OTP resent successfully",
        INVALID: "Invalid OTP or have been expired. Please try again.",
        NOT_FOUND: "User not found"
    },
    REFRESH_TOKEN: {
        SUCCESS: "Refresh token generated successfully",
    }, 
    CHANGE_PASSWORD: {
        SUCCESS: "Password changed successfully",
        OTP_INVALID: "Invalid OTP or have been expired. Please try again.",
        NOT_FOUND: "User not found"
    }, 
    GET_ALL_USER: {
        SUCCESS: "Users fetched successfully",
        NOT_FOUND: "Users not found"
    }
}

export const OTP_MESSAGE = {
    SUCCESS: "OTP sent successfully",
    LOCKED: `Account locked due to multiple failed attempts. Please try later ${Number(ENV.OTP_LOCKTIME) / 3600} hours.`,
    COOLDOWN: `Account is on cooldown. Please try again in ${Number(ENV.OTP_COOLDOWN)} seconds.`,
    INVALID: "Invalid OTP or have been expired. Please try again.",
}