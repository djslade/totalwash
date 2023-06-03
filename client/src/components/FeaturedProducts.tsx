import { Product } from '@/types'
import React from 'react'
import { ProductsView } from './ProductsView'

export const FeaturedProducts = ({
    products
}: {
    products: Product[]
}) => {
    return (
        <section className="w-full py-6">
            <h1 className="font-bold text-2xl my-6">Featured Products</h1>
            <ProductsView products={products} />
        </section>
    )
}
