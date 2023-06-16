import { state } from '@/store'
import { Product } from '@/types'
import { useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { useSnapshot } from 'valtio'
import { AddToCartButton } from './AddToCartButton'

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
        if (!value) return setQuantity(0)
        if (isNaN(value)) return
        const number = parseInt(value)
        if (number > 99) return setQuantity(99)
        if (number < 1) return setQuantity(0)
        setQuantity(number)
    }

    return (
        <div className="flex gap-3 my-12 text-sm xs:items-center flex-col xs:flex-row p-3">
            <div className="flex items-center h-10">
                <button
                onClick={handleDecreaseQuantity} 
                className="text-xl border border-gray-700 h-full aspect-square flex justify-center items-center bg-gray-200 hover:bg-gray-700 hover:text-gray-100 transition-all focus:bg-gray-700 focus:text-gray-100"><BiMinus /></button>
                <input
                value={quantity}
                onChange={handleQuantityChange}
                className="text-center max-h-full aspect-square border-gray-700 border text-gray-700 bg-gray-50" />
                <button
                onClick={handleIncreaseQuantity}
                className="text-xl border border-gray-700 h-full aspect-square flex justify-center items-center bg-gray-200 hover:bg-gray-700 hover:text-gray-100 transition-all focus:bg-gray-700 focus:text-gray-100"><BiPlus /></button>
            </div>
            <AddToCartButton product={product} quantity={quantity} />
        </div>
    )
}
