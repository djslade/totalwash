"use client"
import { useOutsideClick } from "@/hooks"
import { state } from "@/store"
import { useSnapshot } from "valtio"
import FocusLock from 'react-focus-lock'

export const CartSidebar = () => {
    const snap = useSnapshot(state)

    const modalRef = useOutsideClick(() => state.showCartSidebar = false)
    return (
        <>
            <div className={`overflow-hidden z-[100] top-0 left-0 right-0 bottom-0 bg-black opacity-10 ${snap.showCartSidebar ? 'fixed' : 'hidden'}`}/>
            <FocusLock disabled={!snap.showCartSidebar}>
                <div ref={modalRef} className={`overflow-scroll top-0 right-0 max-w-sm bg-[#F5F5F5] fixed h-full z-[100] ease-in-out duration-300 border-r-2 transition-transform ${snap.showCartSidebar ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="w-full p-3">
                        <h2 className="mt-20 text-2xl font-semibold text-black">Your basket</h2>
                    </div>
                    <div className="flex flex-col gap-3">
                    {snap.cartContents.map((product) =>
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
                        </div>)}
                    </div>
                </div>
            </FocusLock>
        </>
    )
}