import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { shopApi } from '../../api';
import type { Shop, ApiResponse } from '../../types';

/**
 * Query keys for shops
 */
export const shopKeys = {
    all: ['shops'] as const,
    lists: () => [...shopKeys.all, 'list'] as const,
    details: () => [...shopKeys.all, 'detail'] as const,
    detail: (id: string) => [...shopKeys.details(), id] as const,
    myShop: () => [...shopKeys.all, 'my-shop'] as const,
};

/**
 * Hook to get all shops
 */
export const useShops = (
    options?: Omit<UseQueryOptions<ApiResponse<Shop[]>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        queryKey: shopKeys.lists(),
        queryFn: () => shopApi.getShops(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        ...options,
    });
};

/**
 * Hook to get shop by ID
 */
export const useShop = (
    id: string,
    options?: Omit<UseQueryOptions<ApiResponse<Shop>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        queryKey: shopKeys.detail(id),
        queryFn: () => shopApi.getShopById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
        ...options,
    });
};

/**
 * Hook to get my shop (for seller)
 */
export const useMyShop = (
    options?: Omit<UseQueryOptions<ApiResponse<Shop>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        queryKey: shopKeys.myShop(),
        queryFn: () => shopApi.getMyShop(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        ...options,
    });
};
