// Shop related types
export interface Shop {
    id: string;
    name: string;
    logo?: string;
    cover?: string;
    description?: string;
    address: string;
    phone: string;
    ownerId: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateShopRequest {
    name: string;
    logo?: string;
    cover?: string;
    description?: string;
    address: string;
    phone: string;
}

export interface UpdateShopRequest extends Partial<CreateShopRequest> {
    isActive?: boolean;
}
