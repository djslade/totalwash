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

const getProducts = async (id:string, query?:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?category=${id}${query ? `${query}`: ''}`)
  const data = await res.json()
  return data?.products as Product[]
}

const page = async ({
  params,
  searchParams,
}: {
  params:{ id: string },
  searchParams: { page: string, limit: string, text: string, sortby: string },
}) => {
  const { id } = params

  const { page, limit, text, sortby } = searchParams

  console.log(searchParams)

  const getQueryString = () => {
    let queryString = ''
    if (page) {
      queryString += `&page=${page}`
    }
    if (limit) {
      queryString += `&limit=${limit}`
    }
    if (text) {
      queryString += `&text=${text}`
    }
    if (sortby) {
      queryString += `&sortby=${sortby}`
    }
    return queryString
  }

  const category = await getCategory(id)

  const subcategories = await getSubcategories(category._id)

  const products = await getProducts(category._id, getQueryString())

  return (
    <main className="max-w-screen-lg mx-auto py-3">
      <CategoryInfo category={category} />
      <CategoryPreview categories={subcategories} heading="Subcategories"/>
      <SearchedProducts products={products} />
    </main>
  )
}

export default page