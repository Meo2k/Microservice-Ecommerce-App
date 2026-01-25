/**
 * DTO for updating user information
 */
export class UpdateUserDto {
    username?: string | null;
    bio?: string | null;
    avatar_url?: string | null;
}

/**
 * DTO for user address
 */
export class UserAddressDto {
    id?: number;
    street!: string;
    cityId!: number;
    countryId!: number;
    isDefault?: boolean;
}

/**
 * DTO for creating/updating user address
 */
export class CreateAddressDto {
    street!: string;
    cityId!: number;
    countryId!: number;
    isDefault?: boolean;
}

export class UpdateAddressDto extends CreateAddressDto {
    id!: number;
}
