"use client"
import { state } from "@/store"
import { useSnapshot } from "valtio"
import { MobileRenderedCartContents } from "./MobileRenderedCartContents"
import { RenderedCartContents } from "./RenderedCartContents"
import { useNavigate } from "@/hooks"
import axios from "axios"
import { clearFocus } from "@/utilities"

export const Cart = () => {
    const snap = useSnapshot(state)

    const getProcessedCartContents = () => {
        const uniqueProducts = snap.cartContents.reduce((accumulator, product) => {
            if (!accumulator.find((item) => item._id === product._id)) {
              accumulator.push(product)
            }
            return accumulator
          }, [] as any[])
        const processedCartContents:any[] = uniqueProducts.map((product) => {
            const quantity = snap.cartContents.filter((otherProduct) => product._id === otherProduct._id).length
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

    const cartItems = getProcessedCartContents()

    const navigate = useNavigate()

    const clearCart = async () => {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/carts/${snap.cartId}`)
        state.cartId = ''
        state.cartContents = []
        localStorage.removeItem('cartId')
        clearFocus()
    }

    if (cartItems.length === 0 || !cartItems) {
        return (
            <section className="w-full-my-6 py-12">
                <h2>Your cart is empty.</h2>
                <div className="w-full flex justify-between py-3">
                    <button onClick={() => navigate('/catalog')} className="border py-1 bg-white text-gray-900 rounded-md border-gray-500 font-sans font-medium brightness-100 hover:brightness-90 focus:brightness-90 w-max px-3">Return to Store</button>
                </div>
            </section>
        )
    }

    return (
        <section className="w-full my-6">
            <RenderedCartContents cartItems={cartItems}/>
            <MobileRenderedCartContents cartItems={cartItems}/>
            <div className="w-full flex justify-between p-3 flex-col-reverse xxs:flex-row gap-3">
                <button onClick={() => navigate('/catalog')} className="border py-1 bg-white text-gray-900 rounded-md border-gray-500 font-sans font-medium brightness-100 hover:brightness-90 focus:brightness-90 w-max px-3">Continue Shopping</button>
                <button onClick={clearCart} className="border py-1 bg-white text-gray-900 rounded-md border-gray-500 font-sans font-medium brightness-100 hover:brightness-90 focus:brightness-90 w-max px-3">Clear Cart</button>
            </div>
        </section>
    )
}
