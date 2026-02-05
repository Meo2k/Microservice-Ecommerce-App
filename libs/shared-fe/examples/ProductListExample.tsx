/**
 * Example: Product List using shared-fe
 */

'use client';

import { useProducts, useCreateProduct } from '@org/shared-fe';
import type { ProductFilter, CreateProductRequest } from '@org/shared-fe';
import { useState } from 'react';
import { formatCurrency } from '@org/shared-fe';

export default function ExampleProductList() {
    const [filters, setFilters] = useState<ProductFilter>({
        page: 1,
        limit: 10,
    });

    // ✅ Query hook từ shared-fe
    const { data, isLoading, error } = useProducts(filters);

    // ✅ Mutation hook từ shared-fe
    const createProduct = useCreateProduct({
        onSuccess: () => {
            alert('Product created!');
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Products</h1>

            {/* Product Grid */}
            <div className="grid grid-cols-3 gap-4">
                {data?.data.items.map((product) => (
                    <div key={product.id} className="border p-4 rounded-md">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-lg font-bold mt-2">
                            {formatCurrency(product.price)}
                        </p>
                        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex gap-2">
                <button
                    onClick={() => setFilters(f => ({ ...f, page: (f.page || 1) - 1 }))}
                    disabled={filters.page === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2">Page {filters.page}</span>
                <button
                    onClick={() => setFilters(f => ({ ...f, page: (f.page || 1) + 1 }))}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    Next
                </button>
            </div>

            {/* Code Example */}
            <div className="mt-8 p-4 bg-gray-100 rounded-md">
                <p className="text-sm font-mono">
                    <strong>Usage:</strong><br />
                    import {'{ useProducts, formatCurrency }'} from '@org/shared-fe';<br />
                    const {'{ data }'} = useProducts({'{ page: 1, limit: 10 }'});
                </p>
            </div>
        </div>
    );
}
