/**
 * DTOs for Auth Input
 */

export class RegisterDto {
    username?: string | null;
    email!: string;
    password!: string;
    isSeller?: boolean;
}

export class LoginDto {
    email!: string;
    password!: string;
}

export class VerifyOtpDto {
    email!: string;
    otp!: string;
}

export class ResendOtpDto {
    email!: string;
}

export class ChangePasswordDto {
    email!: string;
    code!: string;
    password!: string;
}

export class RegisterSellerDto {
    shopName!: string;
    logoShop?: string;
    coverShop?: string;
    description?: string;
    address!: string;
    phone!: string;
}
