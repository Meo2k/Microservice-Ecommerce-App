import { ErrorRequestHandler } from "express";
import { ErrorCodes, HTTP_STATUS } from '../config/http.config.js';
import { ENV } from '../config/env.config.js';
import { ErrorMessages } from "../constants/messages.js";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(`Error occurred: ${req.path}`, err)

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: ErrorMessages.Common.InternalError,
        code: ErrorCodes.ERR_INTERNAL_SERVER,
        details: ENV.NODE_ENV === "development" ? err?.message || "Somthing went wrong" : "Somthing went wrong"

    })
}