import { Category, Product, Subcategory } from "@/types"
import { CategoryPreview, CategoryInfo, SearchedProducts } from "@/components"

const getCategory = async (id:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories/${id}`)
  const data = await res.json()
  return data?.category as Category
}

const getSubcategories = async (id:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/subcategories?category=${id}`, { next: { revalidate: 60 }})
  const data = await res.json()
  return data?.subcategories as Subcategory[]
}

const getProducts = async (id:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?category=${id}`)
  const data = await res.json()
  return data?.products as Product[]
}

const page = async ({
  params,
}: {
  params:{ id: string },
}) => {
  const { id } = params

  const category = await getCategory(id)

  const subcategories = await getSubcategories(category._id)

  const products = await getProducts(category._id)

  return (
    <main className="max-w-screen-lg mx-auto py-3">
      <CategoryInfo category={category} />
      <CategoryPreview categories={subcategories} heading="Subcategories"/>
      <SearchedProducts products={products} />
    </main>
  )
}

export default page