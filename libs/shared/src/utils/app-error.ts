import { HTTP_STATUS, HttpStatusCodeType } from "../config/http.config.js";

export const ErrorCodes = {
    ERR_INTERNAL_SERVER: "INTERNAL_SERVER_ERROR",
    ERR_BAD_REQUEST: "BAD_REQUEST",
    ERR_UNAUTHORIZED: "UNAUTHORIZED",
    ERR_FORBIDDEN: "FORBIDDEN",
    ERR_NOT_FOUND: "NOT_FOUND",
    ERR_CONFLICT: "CONFLICT",
} as const ; 

export type ErrorCodesType = typeof ErrorCodes[keyof typeof ErrorCodes]

export class AppError extends Error {
    constructor(
        message: string, 
        public statusCode: HttpStatusCodeType = HTTP_STATUS.INTERNAL_SERVER_ERROR,
        public errorCode: ErrorCodesType = ErrorCodes.ERR_INTERNAL_SERVER,
    ){
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class InternalServerError extends AppError {
    constructor(message: string = "Internal Server Error") {
        super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, ErrorCodes.ERR_INTERNAL_SERVER);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string = "Bad Request") {
        super(message, HTTP_STATUS.BAD_REQUEST, ErrorCodes.ERR_BAD_REQUEST);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = "Unauthorized") {
        super(message, HTTP_STATUS.UNAUTHORIZED, ErrorCodes.ERR_UNAUTHORIZED);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = "Forbidden") {
        super(message, HTTP_STATUS.FORBIDDEN, ErrorCodes.ERR_FORBIDDEN);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = "Not Found") {
        super(message, HTTP_STATUS.NOT_FOUND, ErrorCodes.ERR_NOT_FOUND);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = "Conflict") {
        super(message, HTTP_STATUS.CONFLICT, ErrorCodes.ERR_CONFLICT);
    }
}
    