import { SearchedProducts } from "@/components"
import { Product } from "@/types"
import { Metadata } from "next"

const getProducts = async (searchParams:string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?sale=true${searchParams}`, { next: { revalidate: 0 }})
    const data = await res.json()
    const products = data?.products as Product[]
    const total = data?.total as number
    return { products, total }
}

export const metadata:Metadata = {
    title: 'Sale - TotalWash'
}

const page = async ({
    searchParams,
}: {
    searchParams: {page:string, limit:string, sortby: string }
}) => {
    const { page, limit, sortby } = searchParams
    let searchParamsString = ''
    if (page) searchParamsString += `&page=${page}`
    if (limit) {
        searchParamsString += `&limit=${limit}`
    } else {
        searchParamsString += `&limit=6`
    }
    if (sortby) searchParamsString += `&sortby=${sortby}`
    const { products, total } = await getProducts(searchParamsString)
    return (
        <main className="max-w-screen-lg mx-auto p-3">
            <section>
                <h1 className="font-bold text-xl my-6">Sale</h1>
                <h2 className="text my-6">In the TotalWash sale you can save on a range of luxurious bathroom products. From freestanding baths, vanities, showers, basins and brassware to toasty towel rails to keep away the chill, discover all this and more in the TotalWash Sale. Shop now, while stocks last! </h2>
                <SearchedProducts products={products} total={total} />
            </section>
        </main>
    )
}

export default page