"use client"
import { state } from "@/store"
import { useSnapshot } from "valtio"
import { useOutsideClick } from "@/hooks"
import Link from "next/link"

export const NavSidebar = () => {
    const snap = useSnapshot(state)

    const modalRef = useOutsideClick(() => state.showNavSidebar = false)
    return (
        <>
        <div className={`z-10 top-0 left-0 right-0 bottom-0 bg-black opacity-10 lg:hidden ${snap.showNavSidebar ? 'fixed' : 'hidden'}`}/>
        <div ref={modalRef} className={`p-10 pr-20 top-0 left-0 max-w-sm bg-[#F5F5F5] fixed h-full z-10 ease-in-out duration-300 border-r-2 transition-transform lg:-translate-x-full ${snap.showNavSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
            <nav className="max-w-sm justify-between flex flex-col text-base flex-nowrap gap-6 px-12">
                <div className="hover:underline underline-offset-4">
                    <Link href="/catalog/furniture">
                        <span>Bathroom Furniture</span>
                    </Link>
                </div>
                <div className="hover:underline underline-offset-4">
                    <Link href="/catalog/baths">
                        <span>Baths</span>
                    </Link>
                </div>
                <div className="hover:underline underline-offset-4">
                    <Link href="/catalog/showers">
                        <span>Showers</span>
                    </Link>
                </div>
                <div className="hover:underline underline-offset-4">  
                    <Link href="/catalog/toilets">
                        <span>Toilets</span>
                    </Link>
                </div>
                <div className="hover:underline underline-offset-4">
                    <Link href="/catalog/basins">
                        <span>Basins</span>
                    </Link>
                </div>
                <div className="hover:underline underline-offset-4"> 
                    <Link href="/catalog/accessories">
                        <span>Bathroom Accessories</span>
                    </Link>
                </div>
            </nav>
        </div>
        </>
    )
}
