/**
 * Example: Login Form using shared-fe
 * 
 * File này demo cách sử dụng shared-fe library
 */

'use client';

import { useLogin } from '@org/shared-fe';
import type { LoginRequest } from '@org/shared-fe';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@org/shared';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ExampleLoginForm() {
    const router = useRouter();

    // ✅ Sử dụng hook từ shared-fe
    const loginMutation = useLogin({
        onSuccess: (data) => {
            toast.success('Login successful!');
            console.log('User:', data.data.user);
            router.push('/dashboard');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Login failed');
        },
    });

    // Form handling với react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginRequest) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Login Example</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="your@email.com"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="••••••••"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                    {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </button>

                {/* Error Message */}
                {loginMutation.isError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-600 text-sm">
                            {(loginMutation.error as any)?.response?.data?.message || 'An error occurred'}
                        </p>
                    </div>
                )}
            </form>

            {/* Code Example */}
            <div className="mt-8 p-4 bg-gray-100 rounded-md">
                <p className="text-sm font-mono">
                    <strong>Usage:</strong><br />
                    import {'{ useLogin }'} from '@org/shared-fe';<br />
                    const loginMutation = useLogin();<br />
                    loginMutation.mutate({'{ email, password }'});
                </p>
            </div>
        </div>
    );
}
