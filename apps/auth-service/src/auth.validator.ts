import {z} from "zod"
import {stringMsg} from "@org/shared";

const emailSchema = z
    .string(stringMsg("Email"))
    .trim()
    .email("Invalid email")
    .min(1, "Email is required")
    .max(255, "Email must be at most 255 characters long");

const passwordSchema = z
    .string(stringMsg("Password"))
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .max(255, "Password must be at most 255 characters long");

export const registerSchema = z.object({
    username: z.string().trim().max(255, "Username must be at most 255 characters long").optional(),
    email: emailSchema,
    password: passwordSchema,
})

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
})

export type RegisterSchemaType = z.infer<typeof registerSchema>
export type LoginSchemaType = z.infer<typeof loginSchema>