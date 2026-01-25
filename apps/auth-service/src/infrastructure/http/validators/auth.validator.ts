import { z } from "zod";
import { stringMsg } from "@org/shared";


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

export const registerValidator = z.object({
    username: z.string().trim().max(255, "Username must be at most 255 characters long").optional(),
    email: emailSchema,
    password: passwordSchema,
    isSeller: z.boolean().optional().default(false),
});

export const loginValidator = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export const verifyOtpValidator = z.object({
    email: emailSchema,
    otp: z.string().trim().min(4, "OTP must be at least 4 characters long").max(6, "OTP must be at most 6 characters long"),
});

export const resendOtpValidator = z.object({
    email: emailSchema,
});

export const changePasswordValidator = z.object({
    code: z.string().trim().length(4, "Code must be exactly 4 characters long"),
    email: emailSchema,
    password: passwordSchema,
    confirm_password: passwordSchema,
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
});

export const registerSellerValidator = z.object({
    shopName: z.string().trim().max(255, "Shop name must be at most 255 characters long"),
    logoShop: z.string().trim().optional(),
    coverShop: z.string().trim().optional(),
    description: z.string().trim().max(255, "Description must be at most 255 characters long").optional(),
    address: z.string().trim().max(255, "Address must be at most 255 characters long"),
    phone: z.string().trim().max(255, "Phone must be at most 255 characters long"),
});

// Export types
export type RegisterValidatorType = z.infer<typeof registerValidator>;
export type LoginValidatorType = z.infer<typeof loginValidator>;
export type VerifyOtpValidatorType = z.infer<typeof verifyOtpValidator>;
export type ResendOtpValidatorType = z.infer<typeof resendOtpValidator>;
export type ChangePasswordValidatorType = z.infer<typeof changePasswordValidator>;
export type RegisterSellerValidatorType = z.infer<typeof registerSellerValidator>;
