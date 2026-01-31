import { ErrorCodes, HTTP_STATUS, ResultError } from "@org/shared";

export const UserError = {
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: "User not found"
    } as ResultError,
    AlreadyExists: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: "User already exists"
    } as ResultError,
    InvalidData: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: "Invalid user data"
    } as ResultError,
};

export const AddressError = {
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: "Address not found"
    } as ResultError,
    InvalidData: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: "Invalid address data"
    } as ResultError,
    MaxAddressReached: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: "Maximum number of addresses reached"
    } as ResultError,
};

export const CountryError = {
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: "Country not found"
    } as ResultError,
};

export const CityError = {
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: "City not found"
    } as ResultError,
};

