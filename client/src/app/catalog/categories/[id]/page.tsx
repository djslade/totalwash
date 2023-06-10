import { Category, Product, Subcategory } from "@/types"
import { CategoryPreview, CategoryInfo, SearchedProducts } from "@/components"

const getCategory = async (id:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/ranges/${id}`)
  const data = await res.json()
  return data?.range as Category
}

const getSubcategories = async (id:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/ranges?parent=${id}`)
  const data = await res.json()
  return data?.ranges as Subcategory[]
}

const getProducts = async (id:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?range=${id}`)
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

  const subcategories = category.parents.length === 0 ? await getSubcategories(category._id) : null

  const products = await getProducts(category._id)

  return (
    <main className="max-w-screen-lg mx-auto p-3">
      <CategoryInfo category={category} />
      {subcategories && <CategoryPreview categories={subcategories} heading="Subcategories"/>}
      <SearchedProducts products={products} />
    </main>
  )
}

export default page