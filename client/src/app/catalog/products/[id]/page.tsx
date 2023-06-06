import { ProductPageInfo } from "@/components"
import { Product } from "@/types"
import { BiMinus, BiPlus } from "react-icons/bi"

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

const page = async ({
    params,
}: {
    params: { id: string }
}) => {
    const { id } = params
    const product = await getProduct(id)
    return (
        <main className="max-w-screen-lg mx-auto py-3">
            <div className="flex w-full gap-6 my-3">
                <div className="flex-1">
                    <img className="w-full aspect-square object-cover"src={product.photos[0]}/>
                </div>
                <ProductPageInfo product={product}/>
            </div>
        </main>
    )
}

export default page