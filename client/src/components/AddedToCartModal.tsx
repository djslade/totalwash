"use client"
import { useSnapshot } from "valtio"
import { ModalPortal } from "./ModalPortal"
import { state } from "@/store"
import { Product } from "@/types"
import { AiFillCloseCircle, AiOutlineCheckCircle } from "react-icons/ai"
import { RiShoppingCartLine } from "react-icons/ri"
import { useOutsideClick } from "@/hooks"

export const AddToCartModal = ({
  product,
  closeModal,
}: {
  product:Product,
  closeModal: () => void,
}) => {
  const snap = useSnapshot(state)

  const modalRef = useOutsideClick(closeModal)

  const getTotalCartPrice = () => {
    const priceArray = snap.cartContents.map((product) => product.currentPrice)
    const totalInPence = priceArray.reduce((total, price) => total + price, 0)
    return +parseFloat(`${totalInPence}`).toFixed(2)
  }

  return (
    <ModalPortal>
        <div className={`z-[100] inset-0 bg-black opacity-50 fixed`}></div>
        <div ref={modalRef} className="rounded-md fixed z-[100] bg-slate-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-6xl flex h-72">
          <button onClick={closeModal} className="-top-3 -right-3 text-black bg-white rounded-full border border-black absolute text-3xl"><AiFillCloseCircle /></button>
          <div className="flex-1 border-r border-gray-900">
          <div className="w-full flex flex-col items-center p-6">
            <div className="flex w-full gap-2 items-center mb-6">
              <AiOutlineCheckCircle className="bg-green-500 text-white rounded-full text-xl"/>
              <h1 className="text-xl">Item was added to your cart</h1>
            </div>
            <div className="w-full flex gap-3">
              <div className="flex-1">
                <img className="w-full aspect-square object-cover"src={product.photos[0]}/>
              </div>
              <div className="flex-[3] flex flex-col justify-between">
                  <div className="w-full text-ellipsis line-clamp-3">
                    <h2 className="font-bold">{product.name}</h2>
                  </div>
                  <div className="mb-3">
                  {!product.isOnSale ?
                  <span className="font-semibold">{`£${product.currentPrice}`}</span>
                  :
                  <>
                      <span className="line-through font-semibold">{`£${product.fullPrice}`}</span>
                      <span className="text-blue-500 font-semibold">{` £${product.currentPrice}`}</span>
                  </>  
                  }
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col p-6 gap-6">
              <div className="flex gap-2 items-center w-full">
                <RiShoppingCartLine className="bg-blue-500 text-white text-xl rounded-full p-1"/>
                <h1 className="text-xl">{snap.cartContents.length} items in cart</h1>
              </div>
              <div className="flex gap-2 items-end">
                <span className="text-lg">Total</span>
                <span className="text-2xl font-semibold">{`£${getTotalCartPrice()}`}</span>
              </div>
              <div className="flex gap-3">
                <button onClick={closeModal} className="flex-1 border py-2.5 bg-white text-gray-900 rounded-md border-gray-500 font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90">Continue Shopping</button>
                <button className={"flex-1 border py-2.5 uppercase bg-blue-500 rounded-md text-white font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90"}>Go to Checkout</button>
              </div>
            </div>
          </div>
        </div>
    </ModalPortal>
  )
}
