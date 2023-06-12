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

const getProducts = async (id:string, searchParams:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?range=${id}${searchParams}`, { next: { revalidate: 0 }})
  const data = await res.json()
  const products = data?.products as Product[]
  const total = data?.total as number
  return { products, total }
}

const page = async ({
  params,
  searchParams,
}: {
  params:{ id: string },
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

  const { id } = params

  const category = await getCategory(id)

  const subcategories = category.parents.length === 0 ? await getSubcategories(category._id) : null

  const {products, total} = await getProducts(category._id, searchParamsString)

  return (
    <main className="max-w-screen-lg mx-auto p-3">
      <CategoryInfo category={category} />
      {subcategories && <CategoryPreview categories={subcategories} heading="Subcategories"/>}
      <SearchedProducts products={products} total={total}/>
    </main>
  )
}

export default page