"use client"
import { useEscapeModal, useNavigate, useOutsideClick } from "@/hooks"
import FocusLock from 'react-focus-lock'
import { ModalPortal } from "./ModalPortal"
import { ModalBackdrop } from "./ModalBackdrop"
import { formatCartCount, formatPrice } from "@/utilities"
import { useState } from "react"
import { AiOutlineClose, AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import { motion } from "framer-motion"
import { Product } from "@/types"

export const CartSidebar = ({
    closeModal,
    products,
    discount,
}: {
    closeModal: () => void,
    products: Product[]
    discount: number,
}) => {
    const navigate = useNavigate()

    const [showCart, setShowCart] = useState<boolean>(true)

    const handleShowCart = () => {
        setShowCart(true)
    }

    const handleHideCart = () => {
        setShowCart(false)
    }

    const getTotalCartPrice = () => {
        const priceArray = products.map((product) => product.currentPrice)
        const totalInPence = priceArray.reduce((total, price) => total + price, 0)
        return formatPrice(totalInPence)
    }

    const getProcessedCartContents = () => {
        const uniqueProducts = products.reduce((accumulator, product) => {
            if (!accumulator.find((item) => item._id === product._id)) {
              accumulator.push(product)
            }
            return accumulator
          }, [] as any[])
        const processedCartContents:any[] = uniqueProducts.map((product) => {
            const quantity = products.filter((otherProduct) => product._id === otherProduct._id).length
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

    useEscapeModal(closeModal)
    
    return (
        <ModalPortal>
            <ModalBackdrop onClick={closeModal}/>
            <FocusLock>
                <motion.div
                onClick={(evt) => evt.stopPropagation()}
                initial={{ x: "200vw", opacity: 1 }}
                animate={{ x: 0, opacity: 1, transition: { duration: 0.3 }}}
                exit={{ x: "200vw", opacity: 1, transition: { duration: 0.5 }}}
                className="top-0 right-0 max-w-sm w-screen fixed h-screen max-h-screen z-[100] bg-gray-100 flex overflow-auto">
                    <div className="h-full bg-gray-100 flex-1">
                        <div className="w-full pb-3 border-b p-5 flex justify-between">
                            <h1 className="">Summary</h1>
                            <button
                            onClick={closeModal}
                            ><AiOutlineClose /></button>
                        </div>
                        <div className="p-5 pb-3 flex flex-col gap-3 border-b shadow-sm">
                            <div className="flex w-full justify-between">
                                <h2>Subtotal</h2>
                                <h2 className="font-medium">{getTotalCartPrice()}</h2>
                            </div>
                            <div className="flex w-full justify-between">
                                <h2>Discount</h2>
                                <h2 className="font-medium">{formatPrice(discount)}</h2>
                            </div>
                            <div className="flex w-full justify-between mt-5">
                                <h2>Order Total</h2>
                                <h2 className="font-medium">{getTotalCartPrice()}</h2>
                            </div>
                            {showCart ?
                                <button
                                onClick={handleHideCart}
                                className="w-full flex justify-between items-center">
                                    <span>{formatCartCount(products.length)}</span>
                                    <AiOutlineUp/>
                                </button>
                                :
                                <button
                                onClick={handleShowCart}
                                className="w-full flex justify-between items-center">
                                    <span>{formatCartCount(products.length)}</span>
                                    <AiOutlineDown/>
                                </button>
                            }

                        </div>
                        {showCart &&
                            <div className="w-full max-h-96 overflow-y-auto">
                                {getProcessedCartContents().map((cartItem) =>
                                <div className="flex w-full gap-3 border-t p-5">
                                    <div className="flex-1">
                                        <img src={cartItem.product.photos[0]} alt={cartItem.product.name} />
                                    </div>
                                    <div className="flex-[2]">
                                        <div className="flex flex-col gap-3">
                                            <span>{cartItem.product.name}</span>
                                            <span className="">{`Qty: ${cartItem.quantity}`}</span>
                                        </div>            
                                    </div>
                                    <div className="flex-1 text-right">
                                        {formatPrice(cartItem.product.currentPrice)}
                                    </div>
                                </div>
                                )}
                            </div>}
                        <div className="w-full p-5">
                            <button
                            onClick={() => navigate('/checkout/cart')}
                            className="text-sm max-w-sm bg-white text-gray-900 px-3 py-1 border border-gray-900 rounded-sm hover:bg-gray-50">Back to Cart</button>
                        </div>
                    </div>
                </motion.div>
            </FocusLock>
        </ModalPortal>
    )
}