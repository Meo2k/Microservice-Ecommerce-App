import { ErrorCodes, HTTP_STATUS, ResultError, ErrorMessages } from "@org/shared";

export const ProductError = {
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: ErrorMessages.Product.ProductNotFound
    } as ResultError,
    AlreadyExists: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: ErrorMessages.Product.ProductAlreadyExists
    } as ResultError,
    InvalidData: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: ErrorMessages.Product.InvalidProductData
    } as ResultError,
};

export const ShopError = {
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: ErrorMessages.Shop.ShopNotFound
    } as ResultError,
};

