import { ZodError, type AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { Result } from '../utils/result.js';
import { ErrorCodes, HTTP_STATUS } from '../config/http.config.js';
import { ENV } from '../config/env.config.js';

export const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const validatedData = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            req.body = validatedData.body;
            req.query = validatedData.query;
            req.params = validatedData.params;

            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(
                    Result.fail<any>({
                        code: ErrorCodes.ERR_BAD_REQUEST,
                        message: error.errors[0]?.message || "Validation error",
                        details: ENV.NODE_ENV === "development" ? error.errors : undefined,

                    })
                );
            }
            return next(error);
        }
    };
};