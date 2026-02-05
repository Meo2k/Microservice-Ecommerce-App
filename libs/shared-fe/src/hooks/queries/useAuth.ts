import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { authApi } from '../../api';
import type { UserProfile, ApiResponse } from '../../types';

/**
 * Query keys for auth
 */
export const authKeys = {
    all: ['auth'] as const,
    currentUser: () => [...authKeys.all, 'current-user'] as const,
};

/**
 * Hook to get current user
 */
export const useCurrentUser = (
    options?: Omit<UseQueryOptions<ApiResponse<UserProfile>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        queryKey: authKeys.currentUser(),
        queryFn: () => authApi.getCurrentUser(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        ...options,
    });
};
