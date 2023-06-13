"use client"
import { state } from '@/store'
import { getNumberWithCommas } from '@/utilities'
import React from 'react'
import { useSnapshot } from 'valtio'

export const OrderSummary = () => {
    const snap = useSnapshot(state)

    const getTotalCartPrice = () => {
        const priceArray = snap.cartContents.map((product) => product.currentPrice)
        const totalInPence = priceArray.reduce((total, price) => total + price, 0)
        return +parseFloat(`${totalInPence}`).toFixed(2)
      }

    return (
        <div className="w-full max-w-[300px] h-max shadow-md bg-gray-100 rounded-md mt-6">
            <div className="w-full pb-3 border-b p-5">
                <h1>Summary</h1>
            </div>
            <div className="p-5 pb-3 border-b flex flex-col gap-3">
                <div className="flex w-full justify-between">
                    <h2>Subtotal</h2>
                    <h2 className="font-medium">£{getNumberWithCommas(getTotalCartPrice())}</h2>
                </div>
                <div className="flex w-full justify-between">
                    <h2>Discount</h2>
                    <h2 className="font-medium">£0.00</h2>
                </div>
                <div className="flex w-full justify-between mt-5">
                    <h2>Order Total</h2>
                    <h2 className="font-medium">£{getNumberWithCommas(getTotalCartPrice())}</h2>
                </div>
            </div>
            <div className="w-full flex justify-center py-5 px-2">
                <button className="w-full border py-3 uppercase bg-blue-500 rounded-md text-white font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90 text-sm">Proceed to checkout</button>
            </div>
        </div>
    )
}
