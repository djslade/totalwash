"use client"
import { state } from "@/store"
import axios from "axios"
import { useState } from "react"
import { useSnapshot } from "valtio"
import { RenderedCartProduct } from "./RenderedCartProduct"
import { RenderedProductButtons } from "./RenderedProductButtons"
import { useRouter } from "next/navigation"
import { clearFocus } from "@/utilities"

export const RenderedCartItem = ({
    cartItem,
}: {
    cartItem:any
}) => {
    const router = useRouter()

    const snap = useSnapshot(state)

    const [loading, setLoading] = useState<boolean>(false)

    const [quantity, setQuantity] = useState<number>(cartItem.quantity)

    const handleQuantityChange = (evt:any) => {
        if (loading) return
        const value = evt.target.value
        if (!value) return setQuantity(0)
        if (isNaN(value)) return
        const number = parseInt(value)
        if (number > 99) return setQuantity(99)
        if (number < 1) return setQuantity(0)
        setQuantity(number)
    }

    const updateQuantityInCart = async () => {
        try {
            if (loading) return
            if (quantity === cartItem.quantity) return
            if (quantity < 1) return
            setLoading(true)
            const filteredProducts = snap.cartContents.filter((product) => product._id !== cartItem.product._id)
            const newProducts = []
            for (let i = 0; i < quantity; i += 1) {
                newProducts.push(cartItem.product)
            }
            const productIds = [...filteredProducts, ...newProducts].map((product) => product._id)
            const cart = await axios.put(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/carts/${snap.cartId}`,
                {
                    discount: 0,
                    products: productIds
                }
            )
            state.cartContents = cart.data.cart.products
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
            clearFocus()
            router.refresh()
        }
    }

    const removeItemFromCart = async () => {
        try {
            if (loading) return
            setLoading(true)
            const filteredProducts = snap.cartContents.filter((product) => product._id !== cartItem.product._id)
            const productIds = filteredProducts.map((product) => product._id)
            const cart = await axios.put(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/carts/${snap.cartId}`,
                {
                    discount: 0,
                    products: productIds
                }
            )
            state.cartContents = cart.data.cart.products
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
            clearFocus()
            router.refresh()
            
        }
    }

    const numberWithCommas = (number:number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    return (
        <tr key={cartItem.product._id} className="border-b w-full">
            <td className="py-3 w-full">
                <div className="flex flex-col w-full">
                    <RenderedCartProduct product={cartItem.product} />
                    <RenderedProductButtons handleRemove={removeItemFromCart} handleUpdate={updateQuantityInCart}/>
                </div>
            </td>
            <td className="px-3 py-3 align-top text-lg font-medium">£{numberWithCommas(cartItem.product.currentPrice)}</td>
            <td className="p-1 align-top">
                <input
                className="w-10 p-2 text-center border"
                value={quantity}
                onChange={handleQuantityChange}/>
            </td>
            <td className="px-3 py-3 align-top text-lg font-medium">£{numberWithCommas(cartItem.subtotal)}</td>
        </tr>
    )
}
