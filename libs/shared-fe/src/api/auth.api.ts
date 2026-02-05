import { apiClient } from './client';
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    VerifyOtpRequest,
    VerifyOtpResponse,
    ResendOtpRequest,
    ChangePasswordRequest,
    RegisterSellerRequest,
    ApiResponse,
} from '../types';

/**
 * Auth API endpoints
 */
export const authApi = {
    /**
     * Login user
     */
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/auth/login', data);

        // Save tokens to localStorage
        if (response.data.success && response.data.data.tokens) {
            const { accessToken, refreshToken } = response.data.data.tokens;
            if (typeof window !== 'undefined') {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            }
        }

        return response.data;
    },

    /**
     * Register new user
     */
    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
        const response = await apiClient.post<RegisterResponse>('/auth/register', data);
        return response.data;
    },

    /**
     * Verify OTP
     */
    verifyOtp: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
        const response = await apiClient.post<VerifyOtpResponse>('/auth/verify-otp', data);

        // Save tokens to localStorage
        if (response.data.success && response.data.data.tokens) {
            const { accessToken, refreshToken } = response.data.data.tokens;
            if (typeof window !== 'undefined') {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            }
        }

        return response.data;
    },

    /**
     * Resend OTP
     */
    resendOtp: async (data: ResendOtpRequest): Promise<ApiResponse> => {
        const response = await apiClient.post<ApiResponse>('/auth/resend-otp', data);
        return response.data;
    },

    /**
     * Change password
     */
    changePassword: async (data: ChangePasswordRequest): Promise<ApiResponse> => {
        const response = await apiClient.post<ApiResponse>('/auth/change-password', data);
        return response.data;
    },

    /**
     * Register seller
     */
    registerSeller: async (data: RegisterSellerRequest): Promise<ApiResponse> => {
        const response = await apiClient.post<ApiResponse>('/auth/register-seller', data);
        return response.data;
    },

    /**
     * Logout user
     */
    logout: async (): Promise<ApiResponse> => {
        const response = await apiClient.post<ApiResponse>('/auth/logout');

        // Clear tokens from localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }

        return response.data;
    },

    /**
     * Get current user
     */
    getCurrentUser: async () => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    },
};
