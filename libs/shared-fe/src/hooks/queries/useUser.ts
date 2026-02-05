import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { userApi } from '../../api';
import type { UserProfile, UserAddress, ApiResponse } from '../../types';

/**
 * Query keys for user
 */
export const userKeys = {
    all: ['user'] as const,
    profile: () => [...userKeys.all, 'profile'] as const,
    addresses: () => [...userKeys.all, 'addresses'] as const,
};

/**
 * Hook to get user profile
 */
export const useUserProfile = (
    options?: Omit<UseQueryOptions<ApiResponse<UserProfile>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        queryKey: userKeys.profile(),
        queryFn: () => userApi.getProfile(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        ...options,
    });
};

/**
 * Hook to get user addresses
 */
export const useUserAddresses = (
    options?: Omit<UseQueryOptions<ApiResponse<UserAddress[]>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        queryKey: userKeys.addresses(),
        queryFn: () => userApi.getAddresses(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        ...options,
    });
};
