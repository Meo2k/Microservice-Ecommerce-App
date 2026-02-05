import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
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
        const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);

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
        const response = await apiClient.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
        return response.data;
    },

    /**
     * Verify OTP
     */
    verifyOtp: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
        const response = await apiClient.post<VerifyOtpResponse>(API_ENDPOINTS.AUTH.VERIFY_OTP, data);

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
        const response = await apiClient.post<ApiResponse>(API_ENDPOINTS.AUTH.RESEND_OTP, data);
        return response.data;
    },

    /**
     * Change password
     */
    changePassword: async (data: ChangePasswordRequest): Promise<ApiResponse> => {
        const response = await apiClient.post<ApiResponse>(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
        return response.data;
    },

    /**
     * Register seller
     */
    registerSeller: async (data: RegisterSellerRequest): Promise<ApiResponse> => {
        const response = await apiClient.post<ApiResponse>(API_ENDPOINTS.AUTH.REGISTER_SELLER, data);
        return response.data;
    },

    /**
     * Logout user
     */
    logout: async (): Promise<ApiResponse> => {
        const response = await apiClient.post<ApiResponse>(API_ENDPOINTS.AUTH.LOGOUT);

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
        const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
        return response.data;
    },
};
