import { ErrorCodes, HTTP_STATUS, ResultError } from "@org/shared";

export const ProductError = {
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: "Product not found"
    } as ResultError,
    AlreadyExists: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: "Product already exists"
    } as ResultError,
    InvalidData: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: "Invalid product data"
    } as ResultError,
};

export const ShopError = {
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: "Shop not found"
    } as ResultError,
};
