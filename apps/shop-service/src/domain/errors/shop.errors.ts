import { ErrorCodes, HTTP_STATUS, ResultError, ErrorMessages } from "@org/shared/server";

export const ShopErrors = {
    MissingId: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: "Shop ID is required"
    } as ResultError,
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: ErrorMessages.Shop.ShopNotFound
    } as ResultError,
};
