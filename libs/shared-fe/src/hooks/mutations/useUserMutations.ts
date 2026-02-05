import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { userApi } from '../../api';
import { userKeys } from '../queries/useUser';
import type {
    UserProfile,
    UpdateUserRequest,
    UserAddress,
    ApiResponse,
} from '../../types';

/**
 * Hook for update profile mutation
 */
export const useUpdateProfile = (
    options?: Omit<UseMutationOptions<ApiResponse<UserProfile>, Error, UpdateUserRequest>, 'mutationFn'>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateUserRequest) => userApi.updateProfile(data),
        onSuccess: (data, variables, context) => {
            // Invalidate profile query
            queryClient.invalidateQueries({ queryKey: userKeys.profile() });
            // @ts-expect-error - TanStack Query v5 signature mismatch
            options?.onSuccess?.(data, variables, context);
        },
        ...options,
    });
};

/**
 * Hook for add address mutation
 */
export const useAddAddress = (
    options?: Omit<UseMutationOptions<ApiResponse<UserAddress>, Error, Omit<UserAddress, 'id' | 'userId'>>, 'mutationFn'>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<UserAddress, 'id' | 'userId'>) => userApi.addAddress(data),
        onSuccess: (data, variables, context) => {
            // Invalidate addresses query
            queryClient.invalidateQueries({ queryKey: userKeys.addresses() });
            // @ts-expect-error - TanStack Query v5 signature mismatch
            options?.onSuccess?.(data, variables, context);
        },
        ...options,
    });
};

/**
 * Hook for update address mutation
 */
export const useUpdateAddress = (
    options?: Omit<UseMutationOptions<ApiResponse<UserAddress>, Error, { id: string; data: Partial<UserAddress> }>, 'mutationFn'>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<UserAddress> }) =>
            userApi.updateAddress(id, data),
        onSuccess: (data, variables, context) => {
            // Invalidate addresses query
            queryClient.invalidateQueries({ queryKey: userKeys.addresses() });
            // @ts-expect-error - TanStack Query v5 signature mismatch
            options?.onSuccess?.(data, variables, context);
        },
        ...options,
    });
};

/**
 * Hook for delete address mutation
 */
export const useDeleteAddress = (
    options?: Omit<UseMutationOptions<ApiResponse, Error, string>, 'mutationFn'>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => userApi.deleteAddress(id),
        onSuccess: (data, variables, context) => {
            // Invalidate addresses query
            queryClient.invalidateQueries({ queryKey: userKeys.addresses() });
            // @ts-expect-error - TanStack Query v5 signature mismatch
            options?.onSuccess?.(data, variables, context);
        },
        ...options,
    });
};
