"use client"
import { state } from "@/store"
import { Product } from "@/types"
import { useSnapshot } from "valtio"
import { AddToCartModal } from "./AddedToCartModal"
import { useState } from "react"
import axios from "axios"

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
            className="w-full border py-3 uppercase bg-blue-500 rounded-md text-white font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90">Add to Cart</button>
            :
            <button
            onClick={handleAddToCart}
            className="flex-1 border py-2.5 uppercase bg-blue-500 rounded-md text-white font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90">Add to Cart</button>
            }
            {showModal && <AddToCartModal product={product} closeModal={handleCloseModal}/>}
        </>

    )


}
