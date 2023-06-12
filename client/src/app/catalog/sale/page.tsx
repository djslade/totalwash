import { SearchedProducts } from "@/components"
import { Product } from "@/types"

const getProducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?sale=true`)
    const data = await res.json()
    return data?.products as Product[]
}

const page = async () => {
    const products = await getProducts()
    return (
        <main className="max-w-screen-lg mx-auto p-3">
            <section>
                <h1 className="font-bold text-xl my-6">Sale</h1>
                <h2 className="text my-6">In the TotalWash sale you can save on a range of luxurious bathroom products. From freestanding baths, vanities, showers, basins and brassware to toasty towel rails to keep away the chill, discover all this and more in the TotalWash Sale. Shop now, while stocks last! </h2>
                <SearchedProducts products={products} />
            </section>
        </main>
    )
}

export default page