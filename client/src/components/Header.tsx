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

    return (
        <>
            <header className={`z-50 sticky top-0 px-6 bg-gray-100 text-gray-900`}>
                <div className="flex h-20 items-center max-w-screen-lg mx-auto p-3">
                    <div className="flex-[2] flex md:flex-1 gap-6 items-center h-full">
                        <button className="md:hidden flex justify-center items-center aspect-square rounded-full" onClick={() => setShowNavSidebar(true)}>
                            <RxHamburgerMenu />
                        </button>
                        <button className="text-xl" role="link" onClick={() => navigate("/catalog")}>
                            <span>Total</span>
                            <span className="text-blue-400">Wash</span>
                        </button>
                    </div>
                    <div className="hidden md:flex flex-[2] border-2 justify-end border-black rounded-sm h-9 focus-within:border-blue-500">
                        <input ref={inputRef} type="text" className={snap.darkTheme ? 'header-search-input-dark' : 'header-search-input'} placeholder="Search" />
                        <button className={snap.darkTheme ? 'header-search-btn-dark' : 'header-search-btn'} onClick={handleSearchClick}>
                            <AiOutlineSearch />
                        </button>
                    </div>
                    <div className="flex-1 justify-evenly gap-3 pl-3 flex">
                        <div className="flex flex-1 md:justify-end justify-between">
                        <button
                        className="md:hidden flex justify-center items-center aspect-square rounded-full"
                        onClick={showMobileSearch}>
                            <AiOutlineSearch />
                        </button>
                        <button
                        onClick={() => navigate('/checkout/cart')}
                        className="flex items-center text-base gap-3 md:rounded-xl md:w-auto aspect-square md:aspect-auto rounded-full justify-center hover:underline underline-offset-4">
                            <div className="relative">
                                <RiShoppingCartLine />
                            </div>  
                            <span className="hidden md:inline">Cart</span>
                        </button>
                        </div>
                    </div>
                </div>
                {searchBarVisible && <MobileSearch closeSearch={hideMobileSearch}/>}
            </header>
            {showNavSidebar && <NavSidebar categories={categories} subcategories={subcategories} closeModal={() => setShowNavSidebar(false)}/>}
        </>
    )
       

}