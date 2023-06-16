"use client"
import { state } from "@/store"
import { Product } from "@/types"
import { useSnapshot } from "valtio"
import { AddToCartModal } from "./AddedToCartModal"
import { useState } from "react"
import axios from "axios"
import { cookies } from "next/dist/client/components/headers"
import { AnimatePresence } from "framer-motion"

export const AddToCartButton = ({
    product,
    card,
    quantity,
}: {
    product: Product,
    card?: boolean,
    quantity?: number,
}) => {
    const [showModal, setShowModal] = useState<boolean>(false)

    const snap = useSnapshot(state)

    const [loading, setLoading] = useState<boolean>(false)

    const handleAddToCart = async () => {
        try {
            if (loading) return
            if (quantity === 0) return
            setLoading(true)
            const numberOfItems = quantity || 1
            const productsArray:Product[] = []
            for (let i = 0; i < numberOfItems; i += 1) {
                productsArray.push(product)
            }
            const productIdsArray = productsArray.map((product) => product._id)
            if (!snap.cartId) {
                const cart = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/carts`,
                    {
                        products: productIdsArray
                    }
                )
                let cookie = `cart_id=${cart.data.cart._id};`
                cookie += "path=/;"
                document.cookie = cookie
                localStorage.setItem('cartId', cart.data.cart._id)
                state.cartId = cart.data.cart._id as string
                state.cartContents = cart.data.cart.products
            } else {
                const cartContentsIds = snap.cartContents.map((product) => product._id)
                const cart = await axios.put(
                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/carts/${snap.cartId}`,
                    {
                        discount: 0,
                        products: [...cartContentsIds, ...productIdsArray]
                    }
                )
                state.cartContents = cart.data.cart.products
            }
            setShowModal(true)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
            {!card === true
            ?
            <button
            onClick={handleAddToCart}
            className="w-full border py-3 uppercase bg-blue-400 rounded-md text-gray-100 font-sans font-bold hover:bg-blue-500 focus:bg-blue-500 transition-all">{loading ? "Adding..." : "Add to Cart"}</button>
            :
            <button
            onClick={handleAddToCart}
            className="flex-1 border py-2.5 uppercase bg-blue-400 rounded-md text-gray-100 font-sans font-bold hover:bg-blue-500 focus:bg-blue-500 transition-all">{loading ? "Adding..." : "Add to Cart"}</button>
            }
            <AnimatePresence>  
                {showModal && <AddToCartModal product={product} closeModal={handleCloseModal}/>}
            </AnimatePresence>
        </>

    )


}
