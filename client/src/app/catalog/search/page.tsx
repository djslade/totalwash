import { Product } from "@/types"
import { redirect } from "next/navigation"
import { SearchedProducts } from "@/components"

const getProducts = async (query:string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?text=${query}`,
      {
        next: {
          tags: ['category-products']
        }
      })
    const data = await res.json()
    return data?.products as Product[]
  }

const page = async ({
    searchParams,
}: {
    searchParams: { text: string },
}) => {
    const { text } = searchParams

    if (!text) redirect('/catalog')

    const products = await getProducts(text)

    return (
        <main className="max-w-screen-lg mx-auto py-3">
            <div className="w-full my-3">
                <h1 className="text-xl">{`Showing search results for: "${decodeURI(text)}"`}</h1>
            </div>
            <SearchedProducts products={products} relevance={true}/>
        </main>
    )
}

export default page