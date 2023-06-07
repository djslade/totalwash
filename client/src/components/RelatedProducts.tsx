import { Product } from "@/types"
import { ProductCard } from "./ProductCard"

export const RelatedProducts = ({
    products,
}: {
    products: Product[],
}) => {
    return (
        <div className="">
            <div className="bg-blue-500 text-gray-50 font-bold text-xl my-6 w-full py-1 px-3">
                <h2>Related Products</h2>
            </div>  
            <div className="grid grid-cols-1 md:grid-cols-3 xxs:grid-cols-2 w-full">
                {products.map((product) =>
                <ProductCard key={product._id} product={product}/>)}
            </div>
        </div>

    )
}