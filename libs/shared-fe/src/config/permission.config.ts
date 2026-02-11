export const PERMISSION_CONFIG = {
    BUYER: "USER",
    SELLER: "SELLER",
    ADMIN: "ADMIN",
} as const;

export type PermissionConfig = (typeof PERMISSION_CONFIG)[keyof typeof PERMISSION_CONFIG];