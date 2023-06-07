"use client"
import { state } from "@/store"
import { Product } from "@/types"
import { returnMutableCartArray } from "@/utilities"
import { useSnapshot } from "valtio"
import { AddToCartModal } from "./AddedToCartModal"
import { useState } from "react"

export const AddToCartButton = ({
    product,
    card,
}: {
    product: Product,
    card?: boolean,
}) => {
    const [showModal, setShowModal] = useState<boolean>(false)

    const snap = useSnapshot(state)

    const handleAddToCart = () => {
        console.log('hello')
        state.cartContents = [...returnMutableCartArray(snap.cartContents as Product[]), product]
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
