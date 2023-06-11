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
import { ModalPortal } from "./ModalPortal"

export const NavSidebar = ({
    categories,
    subcategories,
    closeModal,
}: {
    categories: Category[],
    subcategories: Category[],
    closeModal: () => void,
}) => {
    const snap = useSnapshot(state)

    const [selectedCategory, setSelectedCategory] = useState<Category>(emptyCategoryObject)

    const router = useRouter()
    
    const navigate = (path:string) => {
        if (router) {
            router.push(path)
            closeModal()
        }
    }

    const modalRef = useOutsideClick(closeModal)

    return (
        <ModalPortal>
            <div className={`overflow-hidden z-[100] fixed top-0 left-0 right-0 bottom-0 bg-black opacity-10 lg:hidden`}/>
            <FocusLock>
                <div ref={modalRef} className={`top-0 left-0 max-w-sm bg-[#F5F5F5] fixed h-full z-[100] ease-in-out duration-300 border-r-2 transition-transform lg:-translate-x-full`}>
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
        </ModalPortal>
    )
}
