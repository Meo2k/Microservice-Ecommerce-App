import { z } from "zod";

/**
 * Input validation schemas
 * Infrastructure layer - validates HTTP input
 */

// Update User
export const updateUserValidator = z.object({
    params: z.object({
        userId: z.string().transform(Number),
    }),
    body: z.object({
        username: z.string().min(3).max(50).optional().nullable(),
        bio: z.string().max(500).optional().nullable(),
        avatar_url: z.string().url().optional().nullable(),
    })
});

// Create User Address
export const createUserAddressValidator = z.object({
    params: z.object({
        userId: z.string().transform(Number),
    }),
    body: z.object({
        street: z.string().min(1, "Street is required"),
        cityId: z.number().int().positive(),
        countryId: z.number().int().positive(),
        postalCode: z.string().optional().nullable(),
        isDefault: z.boolean().optional(),
    })
});

// Update User Address
export const updateUserAddressValidator = z.object({
    params: z.object({
        userId: z.string().transform(Number),
    }),
    body: z.object({
        id: z.number().int().positive(),
        street: z.string().min(1, "Street is required"),
        cityId: z.number().int().positive(),
        countryId: z.number().int().positive(),
        postalCode: z.string().optional().nullable(),
        isDefault: z.boolean().optional(),
    })
});

// Delete User Address
export const deleteUserAddressValidator = z.object({
    params: z.object({
        userId: z.string().transform(Number),
        addressId: z.string().transform(Number),
    })
});

// Delete User
export const deleteUserValidator = z.object({
    params: z.object({
        userId: z.string().transform(Number),
    })
});

// Get User Addresses
export const getUserAddressesValidator = z.object({
    params: z.object({
        userId: z.string().transform(Number),
    })
});

// Export Command types
export type UpdateUserCommand = z.infer<typeof updateUserValidator>;
export type CreateUserAddressCommand = z.infer<typeof createUserAddressValidator>;
export type UpdateUserAddressCommand = z.infer<typeof updateUserAddressValidator>;
export type DeleteUserAddressCommand = z.infer<typeof deleteUserAddressValidator>;
export type DeleteUserCommand = z.infer<typeof deleteUserValidator>;
export type GetUserAddressesCommand = z.infer<typeof getUserAddressesValidator>;

