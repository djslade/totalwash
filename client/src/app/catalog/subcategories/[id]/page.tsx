import { CategoryInfo, SearchedProducts } from "@/components"
import { Product, Subcategory } from "@/types"

  
const getSubcategory = async (id:string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/subcategories/${id}`)
    const data = await res.json()
    return data?.subcategory as Subcategory
}

const getProducts = async (id:string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?subcategory=${id}`)
    const data = await res.json()
    return data?.products as Product[]
}

const page = async ({
    params,
}: {
    params: { id: string, },
}) => {
    const { id } = params
    
    const subcategory = await getSubcategory(id)

    const products = await getProducts(subcategory._id)

    return (
        <main className="max-w-screen-lg mx-auto py-3">
            <CategoryInfo category={subcategory} /> 
            <SearchedProducts products={products} />
        </main>
    )
}

export default page