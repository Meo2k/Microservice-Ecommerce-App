import {z} from "zod"

export const updateUserValidator = z.object({
    username: z.string().trim().max(255, "Username must be at most 255 characters long").optional(),
    bio: z.string().trim().max(150, "Bio must be at most 150 characters long").optional(),
    avatar_url: z.string().trim().optional(),
})

export type UpdateUserValidatorType = z.infer<typeof updateUserValidator>