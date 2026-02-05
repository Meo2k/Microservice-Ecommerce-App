import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { shopApi } from '../../api';
import { shopKeys } from '../queries/useShop';
import type {
    Shop,
    CreateShopRequest,
    UpdateShopRequest,
    ApiResponse,
} from '../../types';

/**
 * Hook for create shop mutation
 */
export const useCreateShop = (
    options?: Omit<UseMutationOptions<ApiResponse<Shop>, Error, CreateShopRequest>, 'mutationFn'>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateShopRequest) => shopApi.createShop(data),
        onSuccess: (data, variables, context) => {
            // Invalidate shops list and my shop
            queryClient.invalidateQueries({ queryKey: shopKeys.lists() });
            queryClient.invalidateQueries({ queryKey: shopKeys.myShop() });
            // @ts-expect-error - TanStack Query v5 signature mismatch
            options?.onSuccess?.(data, variables, context);
        },
        ...options,
    });
};

/**
 * Hook for update shop mutation
 */
export const useUpdateShop = (
    options?: Omit<UseMutationOptions<ApiResponse<Shop>, Error, { id: string; data: UpdateShopRequest }>, 'mutationFn'>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateShopRequest }) =>
            shopApi.updateShop(id, data),
        onSuccess: (data, variables, context) => {
            // Invalidate shops list, specific shop, and my shop
            queryClient.invalidateQueries({ queryKey: shopKeys.lists() });
            queryClient.invalidateQueries({ queryKey: shopKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: shopKeys.myShop() });
            // @ts-expect-error - TanStack Query v5 signature mismatch
            options?.onSuccess?.(data, variables, context);
        },
        ...options,
    });
};

/**
 * Hook for delete shop mutation
 */
export const useDeleteShop = (
    options?: Omit<UseMutationOptions<ApiResponse, Error, string>, 'mutationFn'>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => shopApi.deleteShop(id),
        onSuccess: (data, id, context) => {
            // Invalidate shops list, specific shop, and my shop
            queryClient.invalidateQueries({ queryKey: shopKeys.lists() });
            queryClient.invalidateQueries({ queryKey: shopKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: shopKeys.myShop() });
            // @ts-expect-error - TanStack Query v5 signature mismatch
            options?.onSuccess?.(data, id, context);
        },
        ...options,
    });
};
