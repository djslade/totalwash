"use client"
import { useSnapshot } from "valtio"
import { ModalPortal } from "./ModalPortal"
import { state } from "@/store"
import { Product } from "@/types"
import { AiFillCloseCircle, AiOutlineCheckCircle } from "react-icons/ai"
import { RiShoppingCartLine } from "react-icons/ri"
import { useEscapeModal, useNavigate } from "@/hooks"
import { ModalBackdrop } from "./ModalBackdrop"
import { formatCartCount, formatPrice, getNumberWithCommas } from "@/utilities"
import { motion } from "framer-motion"

export const AddToCartModal = ({
  product,
  closeModal,
}: {
  product:Product,
  closeModal: () => void,
}) => {
  const snap = useSnapshot(state)

  const navigate = useNavigate()

  const getTotalCartPrice = () => {
    const priceArray = snap.cartContents.map((product) => product.currentPrice)
    const totalInPence = priceArray.reduce((total, price) => total + price, 0)
    return formatPrice(totalInPence)
  }

  useEscapeModal(closeModal)

  return (
    <ModalPortal>
        <ModalBackdrop onClick={closeModal} />
        <div onClick={closeModal} className="inset-0 fixed z-[100] bg-transparent flex justify-center items-center">
          <motion.div
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100vh", opacity: 0 }}
          transition={{ opacity: { bounce: 0 }}}
          onClick={(evt) => evt.stopPropagation()}
          className="bg-gray-50 modal flex flex-col md:flex-row">
            <button onClick={closeModal} className="-top-3 -right-3 text-black bg-white rounded-full border border-black absolute text-3xl"><AiFillCloseCircle /></button>
            <div className="sm:flex-1 max-w-screen-xl sm:border-r border-gray-900 border-b md:border-b-0">
              <div className="w-full flex flex-col items-center p-6">
                <div className="w-full flex items-center gap-2 mb-6">
                  <AiOutlineCheckCircle className="bg-green-500 text-white rounded-full text-xl min-w-fit"/>
                  <h1 className="text-xl">Item was added to your cart</h1>
                </div>
                <div className="w-full flex gap-3">
                  <div className="flex-1">
                    <img className="w-full aspect-square object-cover"src={product.photos[0]} alt={product.name}/>
                  </div>
                  <div className="flex-[3] flex flex-col justify-between">
                      <div className="w-full text-ellipsis line-clamp-3">
                        <h2 className="font-bold">{product.name}</h2>
                      </div>
                      <div className="my-3 text-lg">
                      {!product.isOnSale ?
                      <span className="font-semibold">{`${formatPrice(product.currentPrice)}`}</span>
                      :
                      <>
                          <span className="line-through font-semibold">{`${formatPrice(product.fullPrice)}`}</span>
                          <span className="text-blue-500 font-semibold">{` ${formatPrice(product.currentPrice)}`}</span>
                      </>  
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:flex-1 bg-inherit max-w-screen-xl">
              <div className="flex flex-col p-6 gap-6">
                <div className="flex gap-2 items-center w-full">
                  <RiShoppingCartLine className="bg-blue-500 text-white text-xl rounded-full p-1"/>
                  <h1 className="text-xl">{formatCartCount(snap.cartContents.length)}</h1>
                </div>
                <div className="flex gap-2 items-end">
                  <span className="text-lg">Total</span>
                  <span className="text-2xl font-semibold">{`${getTotalCartPrice()}`}</span>
                </div>
                <div className="flex gap-3 flex-col w-full">
                  <button onClick={closeModal} className="line-clamp-1 flex-1 border py-2.5 bg-white text-gray-900 rounded-md border-gray-500 font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90">Continue Shopping</button>
                  <button onClick={() => navigate('/checkout/cart')} className={"flex-1 border py-2.5 uppercase bg-blue-500 rounded-md text-white font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90"}>Go to Cart</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
    </ModalPortal>
  )
}
