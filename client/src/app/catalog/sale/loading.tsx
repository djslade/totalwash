import { CategoryInfoSkeleton } from '@/components'
import { ProductViewSkeleton } from '@/components/skeletons/ProductViewSkeleton'
import React from 'react'

const SaleLoading = () => {
    return (
        <main className="max-w-screen-lg mx-auto p-3">
            <CategoryInfoSkeleton />
            <ProductViewSkeleton />
        </main>
    )
}

export default SaleLoading