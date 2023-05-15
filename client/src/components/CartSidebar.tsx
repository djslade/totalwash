"use client"
import { useOutsideClick } from "@/hooks"
import { state } from "@/store"
import { useSnapshot } from "valtio"

export const CartSidebar = () => {
    const snap = useSnapshot(state)

    const modalRef = useOutsideClick(() => state.showCartSidebar = false)
    return (
        <>
        <div className={`z-10 top-0 left-0 right-0 bottom-0 bg-black opacity-10 ${snap.showCartSidebar ? 'fixed' : 'hidden'}`}/>
        <div ref={modalRef} className={`top-0 right-0 max-w-sm bg-white  p-10 pl-20 text-white fixed h-full z-10 ease-in-out duration-300 transition-transform ${snap.showCartSidebar ? 'translate-x-0' : 'translate-x-full'}`}>
            <h2 className="mt-20 text-4xl font-semibold text-black">I am a sidebar</h2>
        </div>
        </>
    )
}