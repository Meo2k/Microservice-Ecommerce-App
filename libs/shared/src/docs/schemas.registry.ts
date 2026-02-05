
import { apiRegistry } from './openapi-config.js';
import * as AuthValidator from '../validator/auth.validator.js';

export const registerAllSchemas = () => {
    // --- AUTH SCHEMAS ---
    apiRegistry.register('RegisterInput', AuthValidator.registerSchema);
    apiRegistry.register('LoginInput', AuthValidator.loginSchema);
    apiRegistry.register('VerifyOtpInput', AuthValidator.verifyOtpSchema);
    apiRegistry.register('ResendOtpInput', AuthValidator.resendOtpSchema);
    apiRegistry.register('ChangePasswordInput', AuthValidator.changePasswordSchema);
    apiRegistry.register('RegisterSellerInput', AuthValidator.registerSellerSchema);

    // --- AUTH PATHS (Examples) ---
    apiRegistry.registerPath({
        method: 'post',
        path: '/auth/register',
        tags: ['Auth'],
        summary: 'Register a new user',
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: AuthValidator.registerSchema,
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'User registered successfully',
            },
            400: {
                description: 'Bad request',
            },
        },
    });

    apiRegistry.registerPath({
        method: 'post',
        path: '/auth/login',
        tags: ['Auth'],
        summary: 'Login user',
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: AuthValidator.loginSchema,
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'Login successful',
            },
            401: {
                description: 'Unauthorized',
            },
        },
    });
};
