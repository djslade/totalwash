"use client"
import { state } from "@/store"
import { useEffect, useRef, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { RiShoppingCartLine } from "react-icons/ri"
import { RxHamburgerMenu } from "react-icons/rx"
import { useSnapshot } from "valtio"
import { useRouter } from "next/navigation"
import { Category, Product } from "@/types"
import { MobileSearch } from "./MobileSearch"
import { useSearchProducts } from "@/hooks"
import { NavSidebar } from "./NavSidebar"
import axios from "axios"
import { AnimatePresence } from "framer-motion"

export const Header = ({
    categories,
    subcategories,
}: {
    categories: Category[],
    subcategories: Category[],
}) => {
    const snap = useSnapshot(state)

    const [dropdownVisible, setDropdownVisible] = useState<boolean>(true)

    const [searchBarVisible, setSearchBarVisible] = useState<boolean>(false)

    const [showNavSidebar, setShowNavSidebar] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const search = useSearchProducts()

    const router = useRouter()


    const navigate = (path:string) => {
        if (router) {
            router.push(path)
            state.showCartSidebar = false
            state.showNavSidebar = false
            // This prevents a bug that prevents the dropdown menus in nav from appearing sometimes
            if (path === '/catalog') return
            setDropdownVisible(false)
        }
    }

    const showMobileSearch = () => {
        setSearchBarVisible(true)
    }

    const hideMobileSearch = () => {
        setSearchBarVisible(false)
    }

    const handleSearchClick = () => {
        if (!inputRef.current) return
        if (!inputRef.current.value) return
        search(inputRef.current.value)
    }

    const getCartProducts = async (id:string) => {
        const cartProducts = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/carts/${id}`)
        return cartProducts.data.cart.products as Product[]
    }

    useEffect(() => {
        if (snap.cartId) return
        const cartId = localStorage.getItem('cartId') || ''
        if (!cartId) return
        state.cartId = cartId
        getCartProducts(cartId).then((response) => state.cartContents = response)
    }, [])

    useEffect(() => {
        const checkForSubmit = (evt:any) => {
            if (evt.key !== "Enter") return
            if (document.activeElement !== inputRef.current) return
            handleSearchClick()
        }

        document.addEventListener('keydown', checkForSubmit)

        return () => document.addEventListener('keydown', checkForSubmit)
    })

    return (
        <>
            <header className={`z-50 sticky top-0 px-6 bg-gray-100 text-gray-900`}>
                <div className="flex h-20 items-center max-w-screen-lg mx-auto p-3 md:justify-start justify-between">
                    <div className="flex md:flex-1 gap-6 items-center h-full">
                        <button className="md:hidden flex justify-center items-center outline-offset-8" onClick={() => setShowNavSidebar(true)}>
                            <RxHamburgerMenu />
                        </button>
                        <button className="text-xl hidden md:flex outline-offset-8" role="link" onClick={() => navigate("/catalog")}>
                            <span>Total</span>
                            <span className="text-blue-300">Wash</span>
                        </button>
                    </div>
                    <div className="hidden md:flex flex-[2] border-2 justify-end border-black rounded-sm h-9 focus-within:border-blue-500">
                        <input ref={inputRef} type="text" className={snap.darkTheme ? 'header-search-input-dark' : 'header-search-input'} placeholder="Search" />
                        <button className={snap.darkTheme ? 'header-search-btn-dark' : 'header-search-btn'} onClick={handleSearchClick}>
                            <AiOutlineSearch />
                        </button>
                    </div>
                    <div className="md:hidden">
                        <button className="text-xl outline-offset-8" role="link" onClick={() => navigate("/catalog")}>
                            <span>Total</span>
                            <span className="text-blue-400">Wash</span>
                        </button>
                    </div>
                    <div className="md:flex-1 justify-evenly items-center gap-6 md:gap-3 pl-3 flex">
                        <div className="flex flex-1 md:justify-end justify-between w-full gap-6 items-center">
                            <button
                            className="md:hidden flex justify-center items-center aspect-square outline-offset-8"
                            onClick={showMobileSearch}>
                                <AiOutlineSearch />
                            </button>
                            <button
                            onClick={() => navigate('/checkout/cart')}
                            className="flex items-center text-base gap-3 md:w-auto aspect-square md:aspect-auto justify-center hover:underline underline-offset-4 outline-offset-8">
                                <div className="relative">
                                    <RiShoppingCartLine />
                                </div>  
                                <span className="hidden md:inline">Cart</span>
                            </button>
                        </div>
                    </div>
                </div>
                {searchBarVisible && <MobileSearch closeSearch={hideMobileSearch} />} 
            </header>
            <AnimatePresence>
                {showNavSidebar &&
                <NavSidebar
                categories={categories}
                subcategories={subcategories}
                isVisible={showNavSidebar}
                closeModal={() => setShowNavSidebar(false)}/>}
            </AnimatePresence>
        </>
    )
       

}