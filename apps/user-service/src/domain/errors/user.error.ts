import { ErrorCodes, HTTP_STATUS, ResultError, ErrorMessages } from "@org/shared";

export const UserError = {
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: ErrorMessages.User.UserNotFound
    } as ResultError,
    AlreadyExists: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: ErrorMessages.User.UserAlreadyExists
    } as ResultError,
    InvalidData: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: ErrorMessages.User.InvalidUserData
    } as ResultError,
};

export const AddressError = {
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: ErrorMessages.Address.AddressNotFound
    } as ResultError,
    InvalidData: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: ErrorMessages.Address.InvalidAddressData
    } as ResultError,
    MaxAddressReached: {
        status: HTTP_STATUS.BAD_REQUEST,
        code: ErrorCodes.ERR_BAD_REQUEST,
        message: ErrorMessages.Address.MaxAddressReached
    } as ResultError,
};

export const CountryError = {
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: ErrorMessages.Address.CountryNotFound
    } as ResultError,
};

export const CityError = {
    NotFound: {
        status: HTTP_STATUS.NOT_FOUND,
        code: ErrorCodes.ERR_NOT_FOUND,
        message: ErrorMessages.Address.CityNotFound
    } as ResultError,
};


