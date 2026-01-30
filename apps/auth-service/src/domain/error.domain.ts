import { ErrorCodes, HTTP_STATUS, ResultError } from "@org/shared";

export const UserError = {
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: "User not found"
    } as ResultError,
    AlreadyExists: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: "User already exists"
    } as ResultError,
    InvalidPassword: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: "Invalid password"
    } as ResultError,
    InvalidEmail: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: "Invalid email"
    } as ResultError,
    InvalidOtp: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: "Invalid OTP"
    } as ResultError,
    OtpExpired: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: "OTP expired"
    } as ResultError,
};