import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { productApi } from '../../api';
import { productKeys } from '../queries/useProduct';
import type {
    Product,
    CreateProductRequest,
    UpdateProductRequest,
    ApiResponse,
} from '../../types';

/**
 * Hook for create product mutation
 */
export const useCreateProduct = (
    options?: Omit<UseMutationOptions<ApiResponse<Product>, Error, CreateProductRequest>, 'mutationFn'>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateProductRequest) => productApi.createProduct(data),
        onSuccess: (data, variables, context) => {
            // Invalidate products list
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
            // @ts-expect-error - TanStack Query v5 signature mismatch
            options?.onSuccess?.(data, variables, context);
        },
        ...options,
    });
};

/**
 * Hook for update product mutation
 */
export const useUpdateProduct = (
    options?: Omit<UseMutationOptions<ApiResponse<Product>, Error, { id: string; data: UpdateProductRequest }>, 'mutationFn'>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateProductRequest }) =>
            productApi.updateProduct(id, data),
        onSuccess: (data, variables, context) => {
            // Invalidate products list and specific product
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
            queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
            // @ts-expect-error - TanStack Query v5 signature mismatch
            options?.onSuccess?.(data, variables, context);
        },
        ...options,
    });
};

/**
 * Hook for delete product mutation
 */
export const useDeleteProduct = (
    options?: Omit<UseMutationOptions<ApiResponse, Error, string>, 'mutationFn'>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => productApi.deleteProduct(id),
        onSuccess: (data, id, context) => {
            // Invalidate products list and specific product
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
            queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });
            // @ts-expect-error - TanStack Query v5 signature mismatch
            options?.onSuccess?.(data, id, context);
        },
        ...options,
    });
};
