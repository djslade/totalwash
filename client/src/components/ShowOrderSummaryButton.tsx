"use client"

import { state } from "@/store"
import { formatPrice } from "@/utilities"
import { useState } from "react"
import { useSnapshot } from "valtio"
import { CartSidebar } from "./CartSidebar"
import { AnimatePresence } from "framer-motion"

export const ShowOrderSummaryButton = () => {
    const snap = useSnapshot(state)

    const [showSidebar, setShowSidebar] = useState<boolean>(false)

    const handleShowSidebar = () => {
        setShowSidebar(true)
    }

    const handleHideSidebar = () => {
        setShowSidebar(false)
    }

    const getTotalCartPrice = () => {
        const priceArray = snap.cartContents.map((product) => product.currentPrice)
        const totalInPence = priceArray.reduce((total, price) => total + price, 0)
        return formatPrice(totalInPence)
    }

    return (
        <>
            <button
            onClick={handleShowSidebar}
            className="p-2 bg-gray-200 border border-gray-700 w-full max-w-sm rounded-md mt-6 text-gray-700 flex flex-col items-center gap-2 md:hidden">
                <span className="font-medium">{`Total to pay: ${getTotalCartPrice()}`}</span>
                <span>Click to review your order</span>            
            </button>
            <AnimatePresence>
                {showSidebar && <CartSidebar closeModal={handleHideSidebar} />}
            </AnimatePresence>     
        </>
    )
}
