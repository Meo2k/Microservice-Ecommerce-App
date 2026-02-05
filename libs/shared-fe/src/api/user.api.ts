import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import type {
    UserProfile,
    UpdateUserRequest,
    UserAddress,
    ApiResponse,
} from '../types';

/**
 * User API endpoints
 */
export const userApi = {
    /**
     * Get user profile
     */
    getProfile: async (): Promise<ApiResponse<UserProfile>> => {
        const response = await apiClient.get<ApiResponse<UserProfile>>(API_ENDPOINTS.USER.PROFILE);
        return response.data;
    },

    /**
     * Update user profile
     */
    updateProfile: async (data: UpdateUserRequest): Promise<ApiResponse<UserProfile>> => {
        const response = await apiClient.put<ApiResponse<UserProfile>>(API_ENDPOINTS.USER.PROFILE, data);
        return response.data;
    },

    /**
     * Get user addresses
     */
    getAddresses: async (): Promise<ApiResponse<UserAddress[]>> => {
        const response = await apiClient.get<ApiResponse<UserAddress[]>>(API_ENDPOINTS.USER.ADDRESSES);
        return response.data;
    },

    /**
     * Add new address
     */
    addAddress: async (data: Omit<UserAddress, 'id' | 'userId'>): Promise<ApiResponse<UserAddress>> => {
        const response = await apiClient.post<ApiResponse<UserAddress>>(API_ENDPOINTS.USER.ADDRESSES, data);
        return response.data;
    },

    /**
     * Update address
     */
    updateAddress: async (id: string, data: Partial<UserAddress>): Promise<ApiResponse<UserAddress>> => {
        const response = await apiClient.put<ApiResponse<UserAddress>>(API_ENDPOINTS.USER.ADDRESS_BY_ID(id), data);
        return response.data;
    },

    /**
     * Delete address
     */
    deleteAddress: async (id: string): Promise<ApiResponse> => {
        const response = await apiClient.delete<ApiResponse>(API_ENDPOINTS.USER.ADDRESS_BY_ID(id));
        return response.data;
    },
};
