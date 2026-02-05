import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { authApi } from '../../api';
import { authKeys } from '../queries/useAuth';
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    VerifyOtpRequest,
    VerifyOtpResponse,
    ResendOtpRequest,
    ChangePasswordRequest,
    RegisterSellerRequest,
    ApiResponse,
} from '../../types';

/**
 * Hook for login mutation
 */
export const useLogin = (
    options?: Omit<UseMutationOptions<LoginResponse, Error, LoginRequest>, 'mutationFn'>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginRequest) => authApi.login(data),
        onSuccess: (data, variables, context) => {
            // Invalidate current user query
            queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
            // @ts-expect-error - TanStack Query v5 signature mismatch
            options?.onSuccess?.(data, variables, context);
        },
        ...options,
    });
};

/**
 * Hook for register mutation
 */
export const useRegister = (
    options?: Omit<UseMutationOptions<RegisterResponse, Error, RegisterRequest>, 'mutationFn'>
) => {
    return useMutation({
        mutationFn: (data: RegisterRequest) => authApi.register(data),
        ...options,
    });
};

/**
 * Hook for verify OTP mutation
 */
export const useVerifyOtp = (
    options?: Omit<UseMutationOptions<VerifyOtpResponse, Error, VerifyOtpRequest>, 'mutationFn'>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: VerifyOtpRequest) => authApi.verifyOtp(data),
        onSuccess: (data, variables, context) => {
            // Invalidate current user query
            queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
            // @ts-expect-error - TanStack Query v5 signature mismatch
            options?.onSuccess?.(data, variables, context);
        },
        ...options,
    });
};

/**
 * Hook for resend OTP mutation
 */
export const useResendOtp = (
    options?: Omit<UseMutationOptions<ApiResponse, Error, ResendOtpRequest>, 'mutationFn'>
) => {
    return useMutation({
        mutationFn: (data: ResendOtpRequest) => authApi.resendOtp(data),
        ...options,
    });
};

/**
 * Hook for change password mutation
 */
export const useChangePassword = (
    options?: Omit<UseMutationOptions<ApiResponse, Error, ChangePasswordRequest>, 'mutationFn'>
) => {
    return useMutation({
        mutationFn: (data: ChangePasswordRequest) => authApi.changePassword(data),
        ...options,
    });
};

/**
 * Hook for register seller mutation
 */
export const useRegisterSeller = (
    options?: Omit<UseMutationOptions<ApiResponse, Error, RegisterSellerRequest>, 'mutationFn'>
) => {
    return useMutation({
        mutationFn: (data: RegisterSellerRequest) => authApi.registerSeller(data),
        ...options,
    });
};

/**
 * Hook for logout mutation
 */
export const useLogout = (
    options?: Omit<UseMutationOptions<ApiResponse, Error, void>, 'mutationFn'>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: (data, variables, context) => {
            // Clear all queries
            queryClient.clear();
            // @ts-expect-error - TanStack Query v5 signature mismatch
            options?.onSuccess?.(data, variables, context);
        },
        ...options,
    });
};
