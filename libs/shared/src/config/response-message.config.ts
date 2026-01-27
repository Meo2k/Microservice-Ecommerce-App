
import { ENV } from "./env.config.js"

export const SYSTEM_MESSAGE = {
    AUTH: {
        NOT_VERIFIED: "User is not verified",
        LOCKED: "User is locked", 
        NOT_FOUND: "User not found", 
        UNAUTHORIZED: "Unauthorized", 
        TOKEN_INVALID: "Invalid token "

    }, 
    SHOP: {
        UNAUTHORIZED: "Unauthorized to this shop",
        NOT_FOUND: "Shop not found"
    }
}

export const AUTH_MESSAGE = {
    REGISTER: {
        SUCCESS: "User registered successfully",
        CONFLICT: "User already exists"
    },
    REGISTER_SELLER: {
        SUCCESS: "Seller registered successfully",
        CONFLICT: "Seller already exists"
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
}

export const USER_MESSAGE = {
    GET_ALL_USER: {
        SUCCESS: "Users fetched successfully",
    },
    UPDATE_USER: {
        SUCCESS: "User updated successfully",
        NOT_FOUND: "User not found"
    },
    GET_USER: {
        SUCCESS: "User fetched successfully",
        NOT_FOUND: "User not found"
    },
    DELETE_USER: {
        SUCCESS: "User deleted successfully",
        NOT_FOUND: "User not found"
    }, 
    UPDATE_ADDRESS: {
        SUCCESS: "Address updated successfully",
        NOT_FOUND: "Address not found", 
        MAX_ADDRESS: "User can have maximum 5 addresses"
    }, 
    GET_ADDRESS: {
        SUCCESS: "Address fetched successfully",
        NOT_FOUND: "Address not found"
    }, 
    DELETE_ADDRESS: {
        SUCCESS: "Address deleted successfully",
        NOT_FOUND: "Address not found"
    }, 
    CREATE_ADDRESS: {
        SUCCESS: "Address created successfully",
        NOT_FOUND: "Address not found"
    }, 
}

export const PRODUCT_MESSAGE = {
    CREATE_PRODUCT: {
        SUCCESS: "Product created successfully",
        
    }
}

export const OTP_MESSAGE = {
    SUCCESS: "OTP sent successfully",
    LOCKED: `Account locked due to multiple failed attempts. Please try later ${Number(ENV.OTP_LOCKTIME) / 3600} hours.`,
    COOLDOWN: `Account is on cooldown. Please try again in ${Number(ENV.OTP_COOLDOWN)} seconds.`,
    INVALID: "Invalid OTP or have been expired. Please try again.",
}