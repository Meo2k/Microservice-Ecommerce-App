
import { apiRegistry } from './openapi-config.js';
import * as AuthValidator from '../validator/auth.validator.js';
import * as UserValidator from '../validator/user.validator.js';
import * as ProductValidator from '../validator/product.validator.js';

// import * as ShopValidator from '../validator/shop.validator.js';

export const registerAllSchemas = () => {
    // --- AUTH SCHEMAS ---
    apiRegistry.register('RegisterInput', AuthValidator.registerSchema);
    apiRegistry.register('LoginInput', AuthValidator.loginSchema);
    apiRegistry.register('VerifyOtpInput', AuthValidator.verifyOtpSchema);
    apiRegistry.register('ResendOtpInput', AuthValidator.resendOtpSchema);
    apiRegistry.register('ChangePasswordInput', AuthValidator.changePasswordSchema);
    apiRegistry.register('RegisterSellerInput', AuthValidator.registerSellerSchema);

    // --- USER SCHEMAS ---
    apiRegistry.register('UpdateInput', UserValidator.updateUserSchema);
    apiRegistry.register('CreateAddressInput', UserValidator.createUserAddressSchema);
    apiRegistry.register('UpdateAddressInput', UserValidator.updateUserAddressSchema);

    // --- PRODUCT SCHEMAS ---
    apiRegistry.register('CreateProductInput', ProductValidator.createProductSchema);
    apiRegistry.register('UpdateProductInput', ProductValidator.updateProductSchema);

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

    apiRegistry.registerPath({
        method: 'post',
        path: '/auth/verify-otp',
        tags: ['Auth'],
        summary: 'Verify OTP',
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: AuthValidator.verifyOtpSchema,
                    },
                },
            },
        },
        responses: {
            200: { description: 'OTP verified successfully' },
            400: { description: 'Invalid OTP' },
        },
    });

    apiRegistry.registerPath({
        method: 'post',
        path: '/auth/resend-otp',
        tags: ['Auth'],
        summary: 'Resend OTP',
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: AuthValidator.resendOtpSchema,
                    },
                },
            },
        },
        responses: {
            200: { description: 'OTP resent successfully' },
        },
    });

    apiRegistry.registerPath({
        method: 'post',
        path: '/auth/change-password',
        tags: ['Auth'],
        summary: 'Change Password',
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: AuthValidator.changePasswordSchema,
                    },
                },
            },
        },
        responses: {
            200: { description: 'Password changed successfully' },
        },
    });

    apiRegistry.registerPath({
        method: 'get',
        path: '/auth/me',
        tags: ['Auth'],
        summary: 'Get current user profile',
        security: [{ bearerAuth: [] }],
        responses: {
            200: { description: 'User profile retrieved successfully' },
            401: { description: 'Unauthorized' },
        },
    });

    apiRegistry.registerPath({
        method: 'post',
        path: '/auth/refresh-token',
        tags: ['Auth'],
        summary: 'Refresh Access Token',
        responses: {
            200: { description: 'Token refreshed successfully' },
            401: { description: 'Invalid refresh token' },
        },
    });

    // --- USER PATHS ---
    apiRegistry.registerPath({
        method: 'get',
        path: '/user',
        tags: ['User'],
        summary: 'Get all users (Admin)',
        security: [{ bearerAuth: [] }],
        responses: {
            200: { description: 'List of users' },
            403: { description: 'Forbidden' },
        },
    });

    apiRegistry.registerPath({
        method: 'patch',
        path: '/user',
        tags: ['User'],
        summary: 'Update user profile',
        security: [{ bearerAuth: [] }],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: UserValidator.updateUserSchema,
                    },
                },
            },
        },
        responses: {
            200: { description: 'User updated successfully' },
        },
    });

    apiRegistry.registerPath({
        method: 'post',
        path: '/user/address',
        tags: ['User'],
        summary: 'Create user address',
        security: [{ bearerAuth: [] }],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: UserValidator.createUserAddressSchema,
                    },
                },
            },
        },
        responses: {
            201: { description: 'Address created' },
        },
    });

    apiRegistry.registerPath({
        method: 'get',
        path: '/user/address',
        tags: ['User'],
        summary: 'Get user addresses',
        security: [{ bearerAuth: [] }],
        responses: {
            200: { description: 'List of addresses' },
        },
    });

    apiRegistry.registerPath({
        method: 'put',
        path: '/user/address/{id}',
        tags: ['User'],
        summary: 'Update user address',
        security: [{ bearerAuth: [] }],
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'integer' }
            }
        ],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: UserValidator.updateUserAddressSchema,
                    },
                },
            },
        },
        responses: {
            200: { description: 'Address updated' },
        },
    });

    // --- PRODUCT PATHS ---
    apiRegistry.registerPath({
        method: 'post',
        path: '/product',
        tags: ['Product'],
        summary: 'Create new product',
        security: [{ bearerAuth: [] }],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: ProductValidator.createProductSchema,
                    },
                },
            },
        },
        responses: {
            201: { description: 'Product created' },
        },
    });

    apiRegistry.registerPath({
        method: 'get',
        path: '/product/shop/{shopId}',
        tags: ['Product'],
        summary: 'Get products by shop',
        parameters: [
            {
                name: 'shopId',
                in: 'path',
                required: true,
                schema: { type: 'integer' }
            }
        ],
        responses: {
            200: { description: 'List of products' },
        },
    });

    apiRegistry.registerPath({
        method: 'get',
        path: '/product/{productId}',
        tags: ['Product'],
        summary: 'Get product details',
        parameters: [
            {
                name: 'productId',
                in: 'path',
                required: true,
                schema: { type: 'integer' }
            }
        ],
        responses: {
            200: { description: 'Product details' },
            404: { description: 'Product not found' },
        },
    });

    // --- SHOP PATHS ---
    apiRegistry.registerPath({
        method: 'get',
        path: '/shop/{shopId}',
        tags: ['Shop'],
        summary: 'Get shop details',
        parameters: [
            {
                name: 'shopId',
                in: 'path',
                required: true,
                schema: { type: 'string', format: 'uuid' }
            }
        ],
        responses: {
            200: { description: 'Shop details' },
            404: { description: 'Shop not found' },
        },
    });

};
