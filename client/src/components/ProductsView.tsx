import { Product } from '@/types'
import React from 'react'
import { ProductCard } from './ProductCard'

export const ProductsView = ({
    products,
}: {
    products: Product[]
}) => {
    return (
        <div className="grid md:grid-cols-3 grid-cols-1 xs:grid-cols-2">
            {products.map((product) =>
            <ProductCard product={product}/>)}
        </div>
    )
}
