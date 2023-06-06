import { state } from '@/store'
import { Product } from '@/types'
import { useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { useSnapshot } from 'valtio'

export const ProductAddToCart = ({
    product,
}: {
    product: Product,
}) => {
    const snap = useSnapshot(state)

    const [quantity, setQuantity] = useState(1)

    const handleIncreaseQuantity = () => {
        if (quantity >= 99) return
        setQuantity(quantity + 1)
    }

    const handleDecreaseQuantity = () => {
        if (quantity <= 1) return
        setQuantity(quantity - 1)
    }

    const handleQuantityChange = (evt:any) => {
        const value = evt.target.value
        if (!value) return setQuantity(1)
        if (isNaN(value)) return
        const number = parseInt(value)
        if (number > 99) return setQuantity(99)
        if (number < 1) return setQuantity(1)
        setQuantity(number)
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i += 1) {
            state.cartContents.push(product)
        }
    }

    return (
        <div className="flex sm:flex-row gap-3 my-12 flex-col text-sm items-center ">
            <div className="flex items-center h-10">
                <button
                onClick={handleDecreaseQuantity} 
                className="text-xl border border-gray-900 h-full aspect-square flex justify-center items-center bg-gray-50"><BiMinus /></button>
                <input
                value={quantity}
                onChange={handleQuantityChange}
                className="text-center max-h-full aspect-square border-black border" />
                <button
                onClick={handleIncreaseQuantity}
                className="text-xl border border-gray-900 h-full aspect-square flex justify-center items-center bg-gray-50"><BiPlus /></button>
            </div>
            <button
            onClick={handleAddToCart}
            className="flex-1 border py-3 uppercase bg-blue-500 rounded-md text-white font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90">Add to Cart</button>
        </div>
    )
}
