"use client"
import { state } from "@/store"
import { useSnapshot } from "valtio"
import { useOutsideClick } from "@/hooks"
import { useRouter } from "next/navigation"

export const NavSidebar = ({
    categories,
    subcategories
}: {
    categories: any[],
    subcategories: any[],
}) => {
    const snap = useSnapshot(state)

    const router = useRouter()
    
    const navigate = (path:string) => {
        if (router) {
            router.push(path)
            state.showCartSidebar = false
            state.showNavSidebar = false
        }
    }

    const modalRef = useOutsideClick(() => state.showNavSidebar = false)

    return (
        <>
        <div className={`z-10 top-0 left-0 right-0 bottom-0 bg-black opacity-10 lg:hidden ${snap.showNavSidebar ? 'fixed' : 'hidden'}`}/>
        <div ref={modalRef} className={`p-10 pr-20 top-0 left-0 max-w-sm bg-[#F5F5F5] fixed h-full z-10 ease-in-out duration-300 border-r-2 transition-transform lg:-translate-x-full ${snap.showNavSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
            <nav className="max-w-sm justify-between align-items flex flex-col text-base flex-nowrap gap-6 px-12">
                {categories.map((category) =>
                <div className="hover:underline underline-offset-4" key={category._id}>
                    <button className="hover:underline underline-offset-4" role="link" onClick={() => navigate(`/catalog/${category.slug}`)}>
                        <span>{category.name}</span>
                    </button>
                </div>
                )}
            </nav>
        </div>
        </>
    )
}
