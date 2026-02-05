// User related types
export interface UserProfile {
    id: string;
    email: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
    role?: string;
    isVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface UpdateUserRequest {
    username?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
}

export interface UserAddress {
    id: string;
    userId: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    country: string;
    postalCode: string;
    isDefault?: boolean;
}
