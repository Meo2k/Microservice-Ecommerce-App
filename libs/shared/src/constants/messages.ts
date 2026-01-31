

export const SuccessMessages = {
    // Auth Messages
    Auth: {
        RegisterSuccess: "Registration successful. Please check your email for OTP verification.",
        LoginSuccess: "Login successful.",
        OtpVerified: "OTP verified successfully.",
        OtpResent: "OTP resent successfully.",
        PasswordChanged: "Password changed successfully.",
        TokenRefreshed: "Token refreshed successfully.",
    },

    // User Messages
    User: {
        UsersFetched: "Users fetched successfully.",
        UserUpdated: "User updated successfully.",
        UserDeleted: "User deleted successfully.",
    },

    // Address Messages
    Address: {
        AddressesFetched: "Addresses fetched successfully.",
        AddressCreated: "Address created successfully.",
        AddressUpdated: "Address updated successfully.",
        AddressDeleted: "Address deleted successfully.",
    },

    // Product Messages
    Product: {
        ProductCreated: "Product created successfully.",
        ProductsFetched: "Products fetched successfully.",
        ProductFetched: "Product fetched successfully.",
        ProductUpdated: "Product updated successfully.",
        ProductDeleted: "Product deleted successfully.",
    },

    // Shop Messages
    Shop: {
        ShopCreated: "Shop created successfully.",
        ShopsFetched: "Shops fetched successfully.",
        ShopFetched: "Shop fetched successfully.",
        ShopUpdated: "Shop updated successfully.",
        ShopDeleted: "Shop deleted successfully.",
    },
} as const;

export const ErrorMessages = {
    // Common Errors
    Common: {
        NotFound: "Resource not found.",
        Unauthorized: "Unauthorized access.",
        Forbidden: "Access forbidden.",
        BadRequest: "Bad request.",
        InternalError: "Internal server error.",
        ValidationFailed: "Validation failed.",
    },

    // Auth Errors
    Auth: {
        UserNotFound: "User not found.",
        UserAlreadyExists: "User already exists.",
        InvalidCredentials: "Invalid email or password.",
        InvalidPassword: "Invalid password.",
        InvalidEmail: "Invalid email address.",
        InvalidOtp: "Invalid OTP or OTP has expired. Please try again.",
        OtpExpired: "OTP has expired. Please request a new one.",
        UserNotVerified: "User is not verified. Please verify your email.",
        UserLocked: "User account is locked. Please contact support.",
        TokenInvalid: "Invalid or expired token.",
        TokenExpired: "Token has expired. Please login again.",
    },

    // User Errors
    User: {
        UserNotFound: "User not found.",
        UserAlreadyExists: "User already exists.",
        InvalidUserData: "Invalid user data.",
    },

    // Address Errors
    Address: {
        AddressNotFound: "Address not found.",
        InvalidAddressData: "Invalid address data.",
        MaxAddressReached: "Maximum number of addresses reached.",
        CountryNotFound: "Country not found.",
        CityNotFound: "City not found.",
    },

    // Product Errors
    Product: {
        ProductNotFound: "Product not found.",
        ProductAlreadyExists: "Product already exists.",
        InvalidProductData: "Invalid product data.",
    },

    // Shop Errors
    Shop: {
        ShopNotFound: "Shop not found.",
        ShopAlreadyExists: "Shop already exists.",
        InvalidShopData: "Invalid shop data.",
        UnauthorizedShopAccess: "You are not authorized to access this shop.",
    },

    // OTP Errors
    Otp: {
        OtpLocked: "Account locked due to multiple failed attempts. Please try again later.",
        OtpCooldown: "Account is on cooldown. Please try again later.",
        OtpInvalid: "Invalid OTP or OTP has expired. Please try again.",
    },
} as const;


export type SuccessMessageKey = keyof typeof SuccessMessages;
export type ErrorMessageKey = keyof typeof ErrorMessages;

// Helper type to get all message values
type DeepValues<T> = T extends object
    ? { [K in keyof T]: DeepValues<T[K]> }[keyof T]
    : T;

export type SuccessMessage = DeepValues<typeof SuccessMessages>;
export type ErrorMessage = DeepValues<typeof ErrorMessages>;
