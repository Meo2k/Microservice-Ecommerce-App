export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    TOO_MANY_REQUESTS: 429,
} as const ; 

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

export type HttpStatusCodeType = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];