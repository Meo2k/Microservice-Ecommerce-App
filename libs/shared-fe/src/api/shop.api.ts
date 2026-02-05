import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import type {
    Shop,
    CreateShopRequest,
    UpdateShopRequest,
    ApiResponse,
} from '../types';

/**
 * Shop API endpoints
 */
export const shopApi = {
    /**
     * Get all shops
     */
    getShops: async (): Promise<ApiResponse<Shop[]>> => {
        const response = await apiClient.get<ApiResponse<Shop[]>>(API_ENDPOINTS.SHOP.LIST);
        return response.data;
    },

    /**
     * Get shop by ID
     */
    getShopById: async (id: string): Promise<ApiResponse<Shop>> => {
        const response = await apiClient.get<ApiResponse<Shop>>(API_ENDPOINTS.SHOP.BY_ID(id));
        return response.data;
    },

    /**
     * Get my shop (for seller)
     */
    getMyShop: async (): Promise<ApiResponse<Shop>> => {
        const response = await apiClient.get<ApiResponse<Shop>>(API_ENDPOINTS.SHOP.MY_SHOP);
        return response.data;
    },

    /**
     * Create new shop
     */
    createShop: async (data: CreateShopRequest): Promise<ApiResponse<Shop>> => {
        const response = await apiClient.post<ApiResponse<Shop>>(API_ENDPOINTS.SHOP.LIST, data);
        return response.data;
    },

    /**
     * Update shop
     */
    updateShop: async (id: string, data: UpdateShopRequest): Promise<ApiResponse<Shop>> => {
        const response = await apiClient.put<ApiResponse<Shop>>(API_ENDPOINTS.SHOP.BY_ID(id), data);
        return response.data;
    },

    /**
     * Delete shop
     */
    deleteShop: async (id: string): Promise<ApiResponse> => {
        const response = await apiClient.delete<ApiResponse>(API_ENDPOINTS.SHOP.BY_ID(id));
        return response.data;
    },
};
