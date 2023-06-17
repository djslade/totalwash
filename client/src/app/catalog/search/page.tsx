import { Product } from "@/types"
import { redirect } from "next/navigation"
import { SearchedProducts } from "@/components"
import { Metadata } from "next"

const getProducts = async (query:string, searchParams:string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?q=${query}${searchParams}`, { cache: 'no-store' })
      const data = await res.json()
      const products = data?.products as Product[]
      const total = data?.total as number
      return { products, total }
  }

export const metadata:Metadata = {
    title: 'Search Results - Totalwash'
}

const page = async ({
    searchParams,
}: {
    searchParams: { text: string, page:string, limit:string, sortby: string },
}) => {
    const { text, page, limit, sortby } = searchParams

    let searchParamsString = ''

    if (page) searchParamsString += `&page=${page}`
  
    if (limit) {
        searchParamsString += `&limit=${limit}`
    } else {
        searchParamsString += `&limit=6`
    }
    
    if (sortby) searchParamsString += `&sortby=${sortby}`

    if (!text) redirect('/catalog')

    const {products, total} = await getProducts(text, searchParamsString)

    return (
        <main className="max-w-screen-lg mx-auto py-3 w-screen">
            <div className="w-full my-3">
                <h1 className="text-xl">{`Showing search results for: "${decodeURI(text)}"`}</h1>
            </div>
            <SearchedProducts products={products} relevance={true} total={total}/>
        </main>
    )
}

export default page