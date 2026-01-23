import {z} from "zod"

export const updateUserAddressValidator = z.object({
  id: z.number().optional(), 
  street: z.string().trim().min(1, "Street is required"),
  district: z.string().trim().min(1, "District is required"),
  cityId: z.number().int().positive("Invalid City ID"),
  countryId: z.number().int().positive("Invalid Country ID"),
  isDefault: z.boolean().default(false),
});

export const updateUserValidator = z.object({
    username: z.string().trim().max(255, "Username must be at most 255 characters long").optional(),
    bio: z.string().trim().max(150, "Bio must be at most 150 characters long").optional(),
    avatar_url: z.string().trim().optional(),
})

export type UpdateUserValidatorType = z.infer<typeof updateUserValidator>
export type UpdateUserAddressValidatorType = z.infer<typeof updateUserAddressValidator>
