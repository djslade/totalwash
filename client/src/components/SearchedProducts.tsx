"use client"
import { Product } from '@/types'
import { ProductsView } from './ProductsView'
import { useState, useRef } from 'react'
import { sortProductsArrayAlphabetically } from '@/utilities'

export const SearchedProducts = ({
    products,
    relevance,
}: {
    products: Product[],
    relevance?: boolean;
}) => {
    const [sortingMethod, setSortingMethod] = useState("name")

    const [limit, setLimit] = useState<number>(6)

    const [page, setPage] = useState<number>(1)

    const sectionRef = useRef<HTMLElement>(null)

    const handleProductsScroll = () => {
        if (!sectionRef.current) return
        const headeroffset = 140
        const elementPosition = sectionRef.current.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headeroffset
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        })
    }

    const handleSortingMethodChange = (evt:any) => {
        console.log(evt.target.value)
        setSortingMethod(evt.target.value)
        handleProductsScroll()
    }

    const handlePageLimitChange = (evt:any) => {
        setPage(1)
        setLimit(parseInt(evt.target.value))
        handleProductsScroll()
    }


    const sortProducts = () => {
        const productsCopy = [...products]
        switch (sortingMethod) {
            case "name":
                return productsCopy.sort(sortProductsArrayAlphabetically)
            case "low-high":
                return productsCopy.sort((a, b) => a.currentPrice - b.currentPrice)
            case "high-low":
                return productsCopy.sort((a, b) => b.currentPrice - a.currentPrice)
            case "relevance":
                console.log(products[0].name)
                return products
            default:
                return products
        }
    }

    const getProductsSlice = () => {
        const endingSlice = limit * page
        const startingSlice = endingSlice - limit
        const sortedProducts = sortProducts()
        return sortedProducts.slice(startingSlice, endingSlice)
    }

    const getPageButtonsArray = () => {
        const pageCount = Math.ceil(products.length / limit)
        const array:number[] = []
        for (let i = 0; i < pageCount; i += 1) {
            array.push(i + 1)
        }
        const startingSlice = (page < 3 ? 1 : page - 2) - 1
        const endingSlice = page < 3 ? 5 : page + 2
        if (array.length >= 5) {
            if (page === pageCount) {
                return array.slice(startingSlice - 2, endingSlice)
            }
            if (page === pageCount - 1) {
                return array.slice(startingSlice -1, endingSlice)
            }
        }
        return array.slice(startingSlice, endingSlice)
    }

    const handlePageChange = (newPage:number) => {
        setPage(newPage)
        handleProductsScroll()
    }

    if (products.length === 0) {
        return (
            <section className="w-full py-6" ref={sectionRef}>
                <h2>Your search returned no results.</h2>
            </section>
        )
    }

    return (
        <section className="w-full py-6" ref={sectionRef}>
            <div className="w-full xs:flex justify-between">
                <h1 className="font-bold my-6">{`Showing ${(page * limit) - (limit - 1)}-${page * limit < products.length ? page * limit : products.length} of ${products.length} items`}</h1>
                <div className="flex items-center gap-3">
                    <label>Sort By</label>
                    <select className="border py-1 px-3 rounded border-black" onChange={handleSortingMethodChange}>
                        {relevance && <option value="relevance">Relevance</option>}
                        <option value="name">Product Name</option>
                        <option value="high-low">Price High to Low</option>
                        <option value="low-high">Price Low to High</option>
                    </select>
                </div>
            </div>
            <ProductsView products={getProductsSlice()} />
            <div className="w-full xs:flex justify-between items-center my-6">
                <div className="flex items-center gap-3">
                    <label>Items per page</label>
                    <select className="border py-1 px-3 rounded border-black" onChange={handlePageLimitChange}>
                        <option value="6">6</option>
                        <option value="12">12</option>
                    </select>
                </div>
                <div className="flex gap-3 font-semibold">
                    <button className="p-3">{"<"}</button>
                    {getPageButtonsArray().map((pageNumber) =>
                    <button className={`p-3 ${pageNumber === page ? "bg-gray-100 border-gray-100 rounded-lg" : ""}`} key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
                        {pageNumber}
                    </button>)}
                    <button className="p-3">{">"}</button>
                </div>
            </div>
        </section>
    )
}
