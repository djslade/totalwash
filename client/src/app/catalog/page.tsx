import { Category, Product } from "@/types"
import { CatalogHero, FeaturedProducts, CategoryPreview, LazyImage } from "@/components"

const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/ranges`, { cache: 'no-store' })
  const data = await res.json()
  const categories = data?.ranges as Category[]
  const mainCategories = categories.filter((range) => range.parents.length === 0)
  return mainCategories
}

const getFeaturedProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?featured=true`, { cache: 'no-store' })
  const data = await res.json()
  return data?.products as Product[]
}

const Catalog = async () => {
  const categoriesData = getCategories()

  const featuredProductsData = getFeaturedProducts()

  const [categories, featuredProducts] = await Promise.all([categoriesData, featuredProductsData])

  return (
    <main className="pt-3">
      <CatalogHero />
      <CategoryPreview categories={categories} heading={"Our Product Range"}/>
      <FeaturedProducts products={featuredProducts} />
      <section className="w-full md:h-96 bg-gray-200 text-gray-700 flex justify-center items-center py-3">
        <div className="p-3 rounded-lg max-w-screen-lg md:flex-1 bg-white md:h-2/3 md:shadow-md flex flex-col md:flex-row">
          <div className="flex flex-col md:flex-1 items-center gap-2">
            <div className="w-full h-28 flex justify-center">
              <LazyImage source={"/delivery.png"} classNames={"w-1/2"} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl font-semibold">Quick Delivery</span>
              <span className="text-center w-3/4">Shipped directly to you either standard or express.</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-1 items-center gap-2">
            <div className="w-full h-28 flex justify-center">
              <LazyImage source={"/securedark.jpg"} classNames={"w-1/2"} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl font-semibold">Secure Payments</span>
              <span className="text-center w-3/4">AES-256 encryption keeps your details 100% secure. </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-1 items-center gap-2">
            <div className="w-full h-28 flex justify-center">
              <LazyImage source={"/installation.jpg"} classNames={"w-1/2"} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl font-semibold">Free Installation</span>
              <span className="text-center w-3/4">Installation included on every order free of charge.</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Catalog
