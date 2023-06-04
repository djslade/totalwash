"use client"
import { Product } from '@/types'
import React from 'react'
import { ProductsView } from './ProductsView'
import { useState } from 'react'
import { sortProductsArrayAlphabetically } from '@/utilities'

export const SearchedProducts = ({
    products,
}: {
    products: Product[],
}) => {
    const [productSortMethod, setProductSortMethod] = useState<string>('name')

    const sortProducts = () => {
        switch(productSortMethod) {
            case "high-low":
                return products.sort((a, b) => b.currentPrice - a.currentPrice)
            case "low-high":
                return products.sort((a, b) => a.currentPrice - b.currentPrice)
            case "name":
                return products.sort(sortProductsArrayAlphabetically)
            default:
                return products.sort(sortProductsArrayAlphabetically)
        }
    }

    const handleSelectChange = (evt:any) => {
        setProductSortMethod(evt.target.value)
    }

    return (
        <section className="w-full py-6">
            <div className="w-full xs:flex justify-between">
                <h1 className="font-bold text-xl my-6">{`Showing ${products.length} of ${products.length} items`}</h1>
                <div className="flex items-center gap-3 text-xl">
                    <label>Sort By</label>
                    <select className="border py-1 px-3 rounded border-black" onChange={handleSelectChange}>
                        <option value="name">Product Name</option>
                        <option value="high-low">Price High to Low</option>
                        <option value="low-high">Price Low to High</option>
                    </select>
                </div>
            </div>
            <ProductsView products={sortProducts()} />
        </section>
    )
}
