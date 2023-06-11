"use client"
import { RenderedCartItem } from "./RenderedCartItem"

export const RenderedCartContents = ({
    cartItems,
}: {
    cartItems: any[]
}) => {
    return (
        <table className="w-full hidden sm:block">
            <thead>
                <tr className="border-b">
                    <th className="py-3">Item</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((cartItem) => <RenderedCartItem cartItem={cartItem} key={cartItem.product._id}/>)}
            </tbody>
        </table>
    )
}
