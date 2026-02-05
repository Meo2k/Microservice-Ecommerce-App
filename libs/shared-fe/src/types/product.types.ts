// Product related types
export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    discountPrice?: number;
    stock: number;
    images?: string[];
    categoryId?: string;
    shopId: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateProductRequest {
    name: string;
    description?: string;
    price: number;
    discountPrice?: number;
    stock: number;
    images?: string[];
    categoryId?: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
    isActive?: boolean;
}

export interface ProductFilter {
    categoryId?: string;
    shopId?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    page?: number;
    limit?: number;
}
