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
                <div className="flex-1">
                    <div className="border-gray-800 py-3">
                        <h1 className="font-bold text-xl">{product.name}</h1>
                    </div>
                    <div className="my-3 text-2xl border-t border-gray-800 py-3">
                        {!product.isOnSale ?
                        <span>{`£${product.currentPrice}`}</span>
                        :
                        <>
                            <span className="line-through">{`£${product.fullPrice}`}</span>
                            <span className="text-blue-500">{` £${product.currentPrice}`}</span>
                        </>  
                        }
                    </div>
                    <div className="flex sm:flex-row gap-3 my-6 flex-col text-sm items-center ">
                        <div className="flex items-center h-10">
                            <button className="text-xl border border-gray-900 h-full aspect-square flex justify-center items-center bg-gray-50"><BiMinus /></button>
                            <input value={1} className="text-center max-h-full aspect-square border-black border" />
                            <button className="text-xl border border-gray-900 h-full aspect-square flex justify-center items-center bg-gray-50"><BiPlus /></button>
                        </div>
                        <button className="flex-1 border py-3 uppercase bg-blue-500 rounded-md text-white font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90">Add to Cart</button>
                    </div>
                    <div className="border-t border-gray-800 py-3">
                        <h2 className="my-3 text-lg font-semibold">Product Information</h2>
                        <div>
                            {product.description.map((line) =>
                            <p className="mb-3" key={line}>{line}</p>)}
                        </div>
                    </div>
                    <div className="border-t border-gray-800 py-3">
                        <h2 className="my-3 text-lg font-semibold">Features</h2>
                        <ul className="list-disc pl-5">
                            {product.features.map((feature) =>
                            <li className="mb-3">{feature}</li>)}
                        </ul>
                    </div>
                    {product.whatsIncluded.length > 0 &&
                    <div className="border-t border-gray-800 py-3">
                        <h2 className="my-3 text-lg font-semibold">What's Included</h2>
                        <ul className="list-disc pl-5">
                            {product.whatsIncluded.map((feature) =>
                            <li className="mb-3">{feature}</li>)}
                        </ul>
                    </div>}
                </div>
            </div>
        </main>
    )
}

export default page