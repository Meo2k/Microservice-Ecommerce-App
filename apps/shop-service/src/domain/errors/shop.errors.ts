import { ErrorCodes, HTTP_STATUS, ResultError } from "@org/shared";

export const ShopErrors = {
    MissingId: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: "Shop ID is required"
    } as ResultError,
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: "Shop không tồn tại"
    } as ResultError,
};
