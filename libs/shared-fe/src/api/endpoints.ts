

export const API_ENDPOINTS = {
    /**
     * Authentication endpoints
     */
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        VERIFY_OTP: '/auth/verify-otp',
        RESEND_OTP: '/auth/resend-otp',
        CHANGE_PASSWORD: '/auth/change-password',
        REGISTER_SELLER: '/auth/register-seller',
        ME: '/auth/me',
    },

    /**
     * User endpoints
     */
    USER: {
        PROFILE: '/user/profile',
        ADDRESSES: '/user/addresses',
        ADDRESS_BY_ID: (id: string) => `/user/addresses/${id}`,
    },

    /**
     * Shop endpoints
     */
    SHOP: {
        LIST: '/shops',
        BY_ID: (id: string) => `/shops/${id}`,
        MY_SHOP: '/shops/me',
    },

    /**
     * Product endpoints
     */
    PRODUCT: {
        LIST: '/products',
        BY_ID: (id: string) => `/products/${id}`,
    },
} as const;

/**
 * Type helper for type-safe endpoint access
 */
export type ApiEndpoints = typeof API_ENDPOINTS;
