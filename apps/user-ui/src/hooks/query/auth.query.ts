import { useLogin } from '@org/shared-fe';

/**
 * Hook to handle login with custom logic
 * This wraps the shared useLogin hook with app-specific behavior
 */
export const useLoginMutation = () => {
    return useLogin({
        onSuccess: (data: any) => {
            console.log('Login successful:', data);
            // You can add more app-specific logic here
            // e.g., redirect, show toast, etc.
        },
        onError: (error: any) => {
            console.error('Login failed:', error);
            // Handle error
        },
    });
};
