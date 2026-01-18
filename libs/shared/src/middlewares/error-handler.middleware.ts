import { ErrorRequestHandler } from "express";
import { HTTP_STATUS } from "../config/http.config.js";
import { AppError, ErrorCodes } from "../utils/app-error.js";
import { ENV } from "../config/env.config.js";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(`Error occurred: ${req.path}`, err)


    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            errorCode: err.errorCode,
            details: err.details
        })
    }

    if (err instanceof ZodError || err.name === "ZodError") {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: err.errors[0]?.message || "Validation error",
            error: ENV.NODE_ENV === "development" ? err.errors : undefined,
            errorCode: ErrorCodes.ERR_BAD_REQUEST
        })
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        errorCode: ErrorCodes.ERR_INTERNAL_SERVER,
        error: ENV.NODE_ENV === "development" ? err?.message || "Somthing went wrong" : "Somthing went wrong"

    })
}