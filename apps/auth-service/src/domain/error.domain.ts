import { ErrorCodes, HTTP_STATUS, ResultError, ErrorMessages } from "@org/shared";

export const UserError = {
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: ErrorMessages.Auth.UserNotFound
    } as ResultError,
    AlreadyExists: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: ErrorMessages.Auth.UserAlreadyExists
    } as ResultError,
    InvalidPassword: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: ErrorMessages.Auth.InvalidPassword
    } as ResultError,
    InvalidEmail: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: ErrorMessages.Auth.InvalidEmail
    } as ResultError,
    InvalidOtp: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: ErrorMessages.Auth.InvalidOtp
    } as ResultError,
    OtpExpired: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: ErrorMessages.Auth.OtpExpired
    } as ResultError,
};