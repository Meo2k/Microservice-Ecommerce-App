import { ENV } from "./env.config.js"

export const AUTH_MESSAGE = {
    REGISTER : {
        SUCCESS: "User registered successfully",
        CONFLICT: "User already exists"
    }, 
    LOGIN : {
        SUCCESS: "User logged in successfully",
        NOT_FOUND: "User not found",
        UNAUTHORIZED: "Invalid credentials"
    }, 
    GET_ME : {
        SUCCESS: "User fetched successfully",
        NOT_FOUND: "User not found"
    }
}  

export const OTP_MESSAGE = {
    SUCCESS: "OTP sent successfully",
    LOCKED: `Account locked due to multiple failed attempts. Please try later ${Number(ENV.OTP_LOCKTIME) / 60} hours.`,
    COOLDOWN: `Account is on cooldown. Please try again in ${Number(ENV.OTP_COOLDOWN)} seconds.`,
    EXPIRED: "OTP expired. Please try again.",
    INVALID: "Invalid OTP. Please try again.",
    
}