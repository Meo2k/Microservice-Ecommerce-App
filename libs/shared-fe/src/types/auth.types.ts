// Auth related types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username?: string;
    email: string;
    password: string;
    isSeller?: boolean;
}

export interface VerifyOtpRequest {
    email: string;
    otp: string;
}

export interface ResendOtpRequest {
    email: string;
}

export interface ChangePasswordRequest {
    code: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface RegisterSellerRequest {
    shopName: string;
    logoShop?: string;
    coverShop?: string;
    description?: string;
    address: string;
    phone: string;
}

// Auth response types
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface LoginResponse {
    accessToken: string; 
    user: User; 
    message?: string;
}

export interface RegisterResponse {
    success: boolean;
    data: {
        userId: string;
        email: string;
    };
    message?: string;
}

export interface VerifyOtpResponse {
    success: boolean;
    data: {
        user: User;
        tokens: AuthTokens;
    };
    message?: string;
}

// User type
export interface User {
    id: string;
    email: string;
    username?: string;
    role?: string;
    isVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
