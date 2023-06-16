import { CategoryInfoSkeleton, PreviewSkeleton } from '@/components'
import { ProductViewSkeleton } from '@/components/skeletons/ProductViewSkeleton'
import React from 'react'

const CategoriesLoading = () => {
    return (
        <main className="max-w-screen-lg mx-auto p-3">
            <CategoryInfoSkeleton />
            <PreviewSkeleton />
            <ProductViewSkeleton />
        </main>
    )
}

export default CategoriesLoading