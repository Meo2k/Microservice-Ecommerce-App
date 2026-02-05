import { apiClient } from './client';
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
        const response = await apiClient.get<PaginatedResponse<Product>>('/products', {
            params: filters,
        });
        return response.data;
    },

    /**
     * Get product by ID
     */
    getProductById: async (id: string): Promise<ApiResponse<Product>> => {
        const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
        return response.data;
    },

    /**
     * Create new product
     */
    createProduct: async (data: CreateProductRequest): Promise<ApiResponse<Product>> => {
        const response = await apiClient.post<ApiResponse<Product>>('/products', data);
        return response.data;
    },

    /**
     * Update product
     */
    updateProduct: async (id: string, data: UpdateProductRequest): Promise<ApiResponse<Product>> => {
        const response = await apiClient.put<ApiResponse<Product>>(`/products/${id}`, data);
        return response.data;
    },

    /**
     * Delete product
     */
    deleteProduct: async (id: string): Promise<ApiResponse> => {
        const response = await apiClient.delete<ApiResponse>(`/products/${id}`);
        return response.data;
    },
};
