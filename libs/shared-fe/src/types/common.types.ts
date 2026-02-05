// Common API response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: ApiError;
}

export interface ApiError {
    code: string;
    message: string;
    details?: any;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: {
        items: T[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    message?: string;
}

// Common request types
export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface SortParams {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
