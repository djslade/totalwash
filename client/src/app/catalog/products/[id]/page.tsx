import { ProductPageInfo, RelatedProducts } from "@/components"
import { ProductImageGallery } from "@/components/ProductImageGallery"
import { ProductInfoName } from "@/components/ProductInfoName"
import { Product } from "@/types"

const getProduct = async (id:string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${id}`,
      {
        next: {
          tags: ['viewed-product'],
          revalidate: 60,
        }
      })
    const data = await res.json()
    return data?.product as Product
}

const getRelatedProducts = async (productName:string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?q=${productName}`,
    {
      next: {
        tags: ['viewed-product'],
        revalidate: 60,
      }
    })
    const data = await res.json()
    const products = data?.products as Product[]
    const filteredProducts = products.filter((product) => product.name !== productName)
    return filteredProducts.slice(0, 6)
}

const page = async ({
    params,
}: {
    params: { id: string }
}) => {
    const { id } = params
    const product = await getProduct(id)
    const relatedProducts = await getRelatedProducts(product.name)
    return (
        <main className="max-w-screen-lg mx-auto py-3">
            <div className="flex w-full my-3 sm:flex-row flex-col">
              <ProductInfoName productName={product.name} mobile/>
              <ProductImageGallery product={product} />
              <ProductPageInfo product={product} />
            </div>
            <RelatedProducts products={relatedProducts} />
        </main>
    )
}

export default page