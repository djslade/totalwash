"use client"
import { state } from "@/store"
import { useEffect } from "react"
import { useSnapshot } from "valtio"
import { useOutsideClick } from "@/hooks"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SidebarSubcategories } from "./SidebarSubcategories"
import { SidebarCategories } from "./SidebarCategories"
import { Category, Subcategory } from "@/types"
import { emptyCategoryObject } from "@/data"
import FocusLock from 'react-focus-lock'

export const NavSidebar = ({
    categories,
    subcategories
}: {
    categories: Category[],
    subcategories: Subcategory[],
}) => {
    const snap = useSnapshot(state)

    const [selectedCategory, setSelectedCategory] = useState<Category>(emptyCategoryObject)

    const router = useRouter()
    
    const navigate = (path:string) => {
        if (router) {
            router.push(path)
            state.showCartSidebar = false
            state.showNavSidebar = false
        }
    }

    const modalRef = useOutsideClick(() => state.showNavSidebar = false)

    useEffect(() => {
        if (snap.showNavSidebar === true) {
            setSelectedCategory(emptyCategoryObject)
        }
    }, [snap.showNavSidebar])

    return (
        <>
        <div className={`z-10 top-0 left-0 right-0 bottom-0 bg-black opacity-10 lg:hidden ${snap.showNavSidebar ? 'fixed' : 'hidden'}`}/>
        <FocusLock disabled={!snap.showNavSidebar}>
            <div ref={modalRef} className={`top-0 left-0 max-w-sm bg-[#F5F5F5] fixed h-full z-10 ease-in-out duration-300 border-r-2 transition-transform lg:-translate-x-full ${snap.showNavSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
                {
                selectedCategory !== emptyCategoryObject
                ?
                <SidebarSubcategories
                subcategories={subcategories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                navigate={navigate}/>
                :
                <SidebarCategories
                categories={categories}
                setSelectedCategory={setSelectedCategory}/>
                }
            </div>
        </FocusLock>
        </>
    )
}
