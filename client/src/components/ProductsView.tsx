import { Product } from '@/types'
import React from 'react'
import { ProductCard } from './ProductCard'

export const ProductsView = ({
    products,
}: {
    products: Product[]
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xxs:grid-cols-2 w-full">
            {products.map((product) =>
            <ProductCard key={product._id} product={product}/>)}
        </div>
    )
}
