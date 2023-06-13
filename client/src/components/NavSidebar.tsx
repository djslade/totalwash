"use client"
import { state } from "@/store"
import { useSnapshot } from "valtio"
import { useOutsideClick } from "@/hooks"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SidebarSubcategories } from "./SidebarSubcategories"
import { SidebarCategories } from "./SidebarCategories"
import { Category } from "@/types"
import { emptyCategoryObject } from "@/data"
import FocusLock from 'react-focus-lock'
import { ModalPortal } from "./ModalPortal"
import { ModalBackdrop } from "./ModalBackdrop"
import { motion } from "framer-motion"

export const NavSidebar = ({
    categories,
    subcategories,
    closeModal,
}: {
    categories: Category[],
    subcategories: Category[],
    closeModal: () => void,
    isVisible:boolean,
}) => {
    const [selectedCategory, setSelectedCategory] = useState<Category>(emptyCategoryObject)

    const router = useRouter()
    
    const navigate = (path:string) => {
        if (router) {
            router.push(path)
            closeModal()
        }
    }

    useEffect(() => {
        const handleEscape = (evt:any) => {
            if (evt.key === "Escape") {
                closeModal()
            }
        }

        document.addEventListener('keydown', handleEscape)

        return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    return (
        <ModalPortal>
            <FocusLock>
                <ModalBackdrop onClick={closeModal} />
                    <motion.div
                    onClick={(evt) => evt.stopPropagation()}
                    initial={{ x: "-100vw", opacity: 1 }}
                    animate={{ x: 0, opacity: 1, transition: { duration: 0.05 }}}
                    exit={{ x: "-100vw", opacity: 1, transition: { duration: 0.05 }}}
                    className={`top-0 left-0 max-w-sm bg-[#F5F5F5] fixed h-full z-[100] ease-in-out duration-300 border-r-2 transition-transform lg:-translate-x-full`}>
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
                        closeModal={closeModal}
                        categories={categories}
                        setSelectedCategory={setSelectedCategory}/>
                        }
                    </motion.div>
            </FocusLock>
        </ModalPortal>
    )
}
