import { apiClient } from './client';
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
        const response = await apiClient.get<ApiResponse<UserProfile>>('/user/profile');
        return response.data;
    },

    /**
     * Update user profile
     */
    updateProfile: async (data: UpdateUserRequest): Promise<ApiResponse<UserProfile>> => {
        const response = await apiClient.put<ApiResponse<UserProfile>>('/user/profile', data);
        return response.data;
    },

    /**
     * Get user addresses
     */
    getAddresses: async (): Promise<ApiResponse<UserAddress[]>> => {
        const response = await apiClient.get<ApiResponse<UserAddress[]>>('/user/addresses');
        return response.data;
    },

    /**
     * Add new address
     */
    addAddress: async (data: Omit<UserAddress, 'id' | 'userId'>): Promise<ApiResponse<UserAddress>> => {
        const response = await apiClient.post<ApiResponse<UserAddress>>('/user/addresses', data);
        return response.data;
    },

    /**
     * Update address
     */
    updateAddress: async (id: string, data: Partial<UserAddress>): Promise<ApiResponse<UserAddress>> => {
        const response = await apiClient.put<ApiResponse<UserAddress>>(`/user/addresses/${id}`, data);
        return response.data;
    },

    /**
     * Delete address
     */
    deleteAddress: async (id: string): Promise<ApiResponse> => {
        const response = await apiClient.delete<ApiResponse>(`/user/addresses/${id}`);
        return response.data;
    },
};
