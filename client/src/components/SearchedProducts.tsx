"use client"
import { Product } from '@/types'
import { ProductsView } from './ProductsView'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react'

export const SearchedProducts = ({
    products,
}: {
    products: Product[],
}) => {
    const pathname = usePathname()

    const router = useRouter()

    const searchparams = useSearchParams()

    const handleSelectChange = (evt:any) => {
        const params = new URLSearchParams(searchparams as any)
        params.set('sortby', evt.target.value)
        const newParams = params.toString()
        router.replace(`${pathname}?${newParams}`)
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
            <ProductsView products={products} />
            <div className="flex items-center gap-3 text-xl">
                <label>Items per page</label>
                <select className="border py-1 px-3 rounded border-black" onChange={handleSelectChange}>
                    <option value="name">6</option>
                    <option value="high-low">12</option>
                    <option value="low-high">18</option>
                </select>
            </div>
        </section>
    )
}
