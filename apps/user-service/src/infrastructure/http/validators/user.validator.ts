import { z } from "zod";

/**
 * Input validation schemas
 * Infrastructure layer - validates HTTP input
 */
export const updateUserValidator = z.object({
    username: z.string().min(3).max(50).optional().nullable(),
    bio: z.string().max(500).optional().nullable(),
    avatar_url: z.string().url().optional().nullable(),
});

export const createUserAddressValidator = z.object({
    street: z.string().min(1, "Street is required"),
    cityId: z.number().int().positive(),
    countryId: z.number().int().positive(),
    postalCode: z.string().optional().nullable(),
    isDefault: z.boolean().optional(),
});

export const updateUserAddressValidator = z.object({
    id: z.number().int().positive(),
    street: z.string().min(1, "Street is required"),
    cityId: z.number().int().positive(),
    countryId: z.number().int().positive(),
    postalCode: z.string().optional().nullable(),
    isDefault: z.boolean().optional(),
});

export type UpdateUserValidatorType = z.infer<typeof updateUserValidator>;
export type CreateUserAddressValidatorType = z.infer<typeof createUserAddressValidator>;
export type UpdateUserAddressValidatorType = z.infer<typeof updateUserAddressValidator>;
