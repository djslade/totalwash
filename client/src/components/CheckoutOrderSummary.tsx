"use client"
import { useNavigate } from "@/hooks"
import { state } from "@/store"
import { Product } from "@/types"
import { formatCartCount, formatPrice } from "@/utilities"
import { useState } from "react"
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import { useSnapshot } from "valtio"

export const CheckoutOrderSummary = ({
    products,
    discount,
}: {
    products: Product[],
    discount: number,
}) => {
    const snap = useSnapshot(state)

    const navigate = useNavigate()

    const [showCart, setShowCart] = useState<boolean>(true)

    const handleShowCart = () => {
        setShowCart(true)
    }

    const handleHideCart = () => {
        setShowCart(false)
    }

    const getTotalCartPrice = () => {
        const priceArray = products.map((product) => product.currentPrice)
        const totalInPence = priceArray.reduce((total, price) => total + price, 0)
        return formatPrice(totalInPence)
    }

    const getProcessedCartContents = () => {
        const uniqueProducts = products.reduce((accumulator, product) => {
            if (!accumulator.find((item) => item._id === product._id)) {
              accumulator.push(product)
            }
            return accumulator
          }, [] as any[])
        const processedCartContents:any[] = uniqueProducts.map((product) => {
            const quantity = products.filter((otherProduct) => product._id === otherProduct._id).length
            const subtotal = +parseFloat(`${product.currentPrice * quantity}`).toFixed(2)
            const subtotalFull = +parseFloat(`${product.fullPrice * quantity}`).toFixed(2)
            return {
                product,
                quantity,
                subtotal,
                subtotalFull,
            }
        })
        return processedCartContents.sort((a, b) => a.name - b.name)
    }
    
    return (
        <div className="w-full max-w-sm h-max shadow-md bg-gray-200 rounded-md mt-6 hidden md:block">
            <div className="w-full pb-3 border-b p-5">
                <h1>Summary</h1>
            </div>
            <div className="p-5 pb-3 flex flex-col gap-3 w-full">
                <div className="flex w-full justify-between">
                    <h2>Subtotal</h2>
                    <h2 className="font-medium">{getTotalCartPrice()}</h2>
                </div>
                <div className="flex w-full justify-between">
                    <h2>Discount</h2>
                    <h2 className="font-medium">{formatPrice(discount)}</h2>
                </div>
                <div className="flex w-full justify-between mt-5">
                    <h2>Order Total</h2>
                    <h2 className="font-medium">{getTotalCartPrice()}</h2>
                </div>
                {showCart ?
                    <button
                    onClick={handleHideCart}
                    className="w-full flex justify-between items-center">
                        <span>{formatCartCount(products.length)}</span>
                        <AiOutlineUp/>
                    </button>
                    :
                    <button
                    onClick={handleShowCart}
                    className="w-full flex justify-between items-center">
                        <span>{formatCartCount(products.length)}</span>
                        <AiOutlineDown/>
                    </button>
                }
            </div>
            {showCart &&
            <div className="w-full max-h-[380px] overflow-y-auto">
                {getProcessedCartContents().map((cartItem) =>
                <div
                key={cartItem.product._id}
                className="flex w-full gap-3 border-t p-5">
                    <div className="flex-1">
                        <img src={cartItem.product.photos[0]} alt={cartItem.product.name} />
                    </div>
                    <div className="flex-[2]">
                        <div className="flex flex-col gap-3">
                            <span>{cartItem.product.name}</span>
                            <span className="">{`Qty: ${cartItem.quantity}`}</span>
                        </div>
                        
                    </div>
                    <div className="flex-1 text-right">
                        {formatPrice(cartItem.product.currentPrice)}
                    </div>
                </div>
                )}
            </div>}
            <div className="w-full p-5">
                <button
                onClick={() => navigate('/checkout/cart')}
                className="text-sm max-w-sm bg-gray-50 text-gray-700 px-3 py-1 border border-gray-700 rounded-sm hover:bg-gray-100 focus:bg-gray-100 transiiton-all">Back to Cart</button>
            </div>
        </div>
    )
}
