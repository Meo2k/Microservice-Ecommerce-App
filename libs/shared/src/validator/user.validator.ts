import { z } from "zod";

// Update User
export const updateUserSchema = z.object({
    username: z.string().min(3).max(50).optional().nullable(),
    bio: z.string().max(500).optional().nullable(),
    avatar_url: z.string().url().optional().nullable(),
});

export const updateUserValidator = z.object({
    params: z.object({
        userId: z.string().transform(Number),
    }),
    body: updateUserSchema
});

// Create User Address
export const createUserAddressSchema = z.object({
    street: z.string().min(1, "Street is required"),
    district: z.string().optional().nullable(),
    cityId: z.number().int().positive(),
    countryId: z.number().int().positive(),
    postalCode: z.string().optional().nullable(),
    isDefault: z.boolean().optional(),
});

export const createUserAddressValidator = z.object({
    params: z.object({
        userId: z.string().transform(Number),
    }),
    body: createUserAddressSchema
});

// Update User Address
export const updateUserAddressSchema = z.object({
    id: z.number().int().positive(),
    street: z.string().min(1, "Street is required"),
    district: z.string().optional().nullable(),
    cityId: z.number().int().positive(),
    countryId: z.number().int().positive(),
    postalCode: z.string().optional().nullable(),
    isDefault: z.boolean().optional(),
});

export const updateUserAddressValidator = z.object({
    params: z.object({
        userId: z.string().transform(Number),
    }),
    body: updateUserAddressSchema
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

// Export types
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateUserAddressInput = z.infer<typeof createUserAddressSchema>;
export type UpdateUserAddressInput = z.infer<typeof updateUserAddressSchema>;

export type UpdateUserCommand = z.infer<typeof updateUserValidator>;
export type CreateUserAddressCommand = z.infer<typeof createUserAddressValidator>;
export type UpdateUserAddressCommand = z.infer<typeof updateUserAddressValidator>;
export type DeleteUserAddressCommand = z.infer<typeof deleteUserAddressValidator>;
export type DeleteUserCommand = z.infer<typeof deleteUserValidator>;
export type GetUserAddressesCommand = z.infer<typeof getUserAddressesValidator>;
