import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import type {
    Product,
    CreateProductRequest,
    UpdateProductRequest,
    ProductFilter,
    ApiResponse,
    PaginatedResponse,
} from '../types';

/**
 * Product API endpoints
 */
export const productApi = {
    /**
     * Get all products with filters
     */
    getProducts: async (filters?: ProductFilter): Promise<PaginatedResponse<Product>> => {
        const response = await apiClient.get<PaginatedResponse<Product>>(API_ENDPOINTS.PRODUCT.LIST, {
            params: filters,
        });
        return response.data;
    },

    /**
     * Get product by ID
     */
    getProductById: async (id: string): Promise<ApiResponse<Product>> => {
        const response = await apiClient.get<ApiResponse<Product>>(API_ENDPOINTS.PRODUCT.BY_ID(id));
        return response.data;
    },

    /**
     * Create new product
     */
    createProduct: async (data: CreateProductRequest): Promise<ApiResponse<Product>> => {
        const response = await apiClient.post<ApiResponse<Product>>(API_ENDPOINTS.PRODUCT.LIST, data);
        return response.data;
    },

    /**
     * Update product
     */
    updateProduct: async (id: string, data: UpdateProductRequest): Promise<ApiResponse<Product>> => {
        const response = await apiClient.put<ApiResponse<Product>>(API_ENDPOINTS.PRODUCT.BY_ID(id), data);
        return response.data;
    },

    /**
     * Delete product
     */
    deleteProduct: async (id: string): Promise<ApiResponse> => {
        const response = await apiClient.delete<ApiResponse>(API_ENDPOINTS.PRODUCT.BY_ID(id));
        return response.data;
    },
};
