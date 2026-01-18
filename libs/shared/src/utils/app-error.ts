import { HTTP_STATUS, HttpStatusCodeType } from "../config/http.config.js";

export const ErrorCodes = {
    ERR_INTERNAL_SERVER: "INTERNAL_SERVER_ERROR",
    ERR_BAD_REQUEST: "BAD_REQUEST",
    ERR_UNAUTHORIZED: "UNAUTHORIZED",
    ERR_FORBIDDEN: "FORBIDDEN",
    ERR_NOT_FOUND: "NOT_FOUND",
    ERR_CONFLICT: "CONFLICT",
    ERR_TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
} as const;

export type ErrorCodesType = typeof ErrorCodes[keyof typeof ErrorCodes]

export class AppError extends Error {
    constructor(
        message: string,
        public statusCode: HttpStatusCodeType = HTTP_STATUS.INTERNAL_SERVER_ERROR,
        public errorCode: ErrorCodesType = ErrorCodes.ERR_INTERNAL_SERVER,
        public details?: any
    ) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class InternalServerError extends AppError {
    constructor(message: string = "Internal Server Error", details?: any) {
        super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, ErrorCodes.ERR_INTERNAL_SERVER, details);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string = "Bad Request", details?: any) {
        super(message, HTTP_STATUS.BAD_REQUEST, ErrorCodes.ERR_BAD_REQUEST, details);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = "Unauthorized", details?: any) {
        super(message, HTTP_STATUS.UNAUTHORIZED, ErrorCodes.ERR_UNAUTHORIZED, details);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = "Forbidden", details?: any) {
        super(message, HTTP_STATUS.FORBIDDEN, ErrorCodes.ERR_FORBIDDEN, details);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = "Not Found", details?: any) {
        super(message, HTTP_STATUS.NOT_FOUND, ErrorCodes.ERR_NOT_FOUND, details);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = "Conflict", details?: any) {
        super(message, HTTP_STATUS.CONFLICT, ErrorCodes.ERR_CONFLICT, details);
    }
}

export class ValidationError extends AppError {
    constructor(message: string = "Validation Error", details?: any) {
        super(message, HTTP_STATUS.BAD_REQUEST, ErrorCodes.ERR_BAD_REQUEST, details);
    }
}
