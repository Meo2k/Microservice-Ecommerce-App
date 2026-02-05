import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { productApi } from '../../api';
import type { Product, ProductFilter, ApiResponse, PaginatedResponse } from '../../types';

/**
 * Query keys for products
 */
export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (filters?: ProductFilter) => [...productKeys.lists(), filters] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (id: string) => [...productKeys.details(), id] as const,
};

/**
 * Hook to get products with filters
 */
export const useProducts = (
    filters?: ProductFilter,
    options?: Omit<UseQueryOptions<PaginatedResponse<Product>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        queryKey: productKeys.list(filters),
        queryFn: () => productApi.getProducts(filters),
        staleTime: 2 * 60 * 1000, // 2 minutes
        ...options,
    });
};

/**
 * Hook to get product by ID
 */
export const useProduct = (
    id: string,
    options?: Omit<UseQueryOptions<ApiResponse<Product>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        queryKey: productKeys.detail(id),
        queryFn: () => productApi.getProductById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
        ...options,
    });
};
