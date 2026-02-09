import { ErrorCodes, HTTP_STATUS, ResultError, ErrorMessages } from "@org/shared/server";

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
    InvalidCredentials: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: ErrorMessages.Auth.InvalidCredentials
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
    UserNotVerified: {
        status: HTTP_STATUS.FORBIDDEN,
        code: ErrorCodes.ERR_FORBIDDEN,
        message: ErrorMessages.Auth.UserNotVerified
    } as ResultError,
    UserLocked: {
        status: HTTP_STATUS.FORBIDDEN,
        code: ErrorCodes.ERR_FORBIDDEN,
        message: ErrorMessages.Auth.UserLocked
    } as ResultError,
    Forbidden: {
        status: HTTP_STATUS.FORBIDDEN,
        code: ErrorCodes.ERR_FORBIDDEN,
        message: ErrorMessages.Common.Forbidden
    } as ResultError,
};