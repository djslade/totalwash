import { Category } from "@/types"
import { CatalogHero, ProductRange } from "@/components"

const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories`, { next: { revalidate: 60 }})
  const data = await res.json()
  return data?.categories as Category[]
}

const Catalog = async () => {
  const categories = await getCategories()

  return (
    <main className="max-w-screen-lg mx-auto py-3 flex flex-col gap-3">
      <CatalogHero />
      <ProductRange categories={categories} />
    </main>
  )
}

export default Catalog
