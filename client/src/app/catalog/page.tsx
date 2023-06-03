import { Category, Product } from "@/types"
import { CatalogHero, FeaturedProducts, ProductRange } from "@/components"

const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories`, { next: { revalidate: 60 }})
  const data = await res.json()
  return data?.categories as Category[]
}

const getFeaturedProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?featured=true`)
  const data = await res.json()
  return data?.products as Product[]
}

const Catalog = async () => {
  const categories = await getCategories()

  const featuredProducts = await getFeaturedProducts()

  return (
    <main className="max-w-screen-lg mx-auto py-3 flex flex-col gap-3">
      <CatalogHero />
      <ProductRange categories={categories} />
      <FeaturedProducts products={featuredProducts} />
    </main>
  )
}

export default Catalog
