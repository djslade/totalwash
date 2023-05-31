"use client"
import { state } from "@/store"
import { useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { MdLightMode, MdDarkMode } from "react-icons/md"
import { RiShoppingCartLine } from "react-icons/ri"
import { RxHamburgerMenu } from "react-icons/rx"
import { useSnapshot } from "valtio"
import { useRouter } from "next/navigation"
import { Category, Subcategory } from "@/types"
import { CSSTransition } from "react-transition-group"
import { MobileSearch } from "./MobileSearch"

export const Header = ({
    categories,
    subcategories
}: {
    categories: Category[],
    subcategories: Subcategory[],
}) => {
    const snap = useSnapshot(state)

    const [dropdownVisible, setDropdownVisible] = useState<boolean>(true)

    const [searchBarVisible, setSearchBarVisible] = useState<boolean>(false)

    const setDarkTheme = () => {
      state.darkTheme = true
    }
  
    const setLightTheme = () => {
      state.darkTheme = false
    }

    const router = useRouter()

    const navigate = (path:string) => {
        if (router) {
            router.push(path)
            state.showCartSidebar = false
            state.showNavSidebar = false
            setDropdownVisible(false)
        }
    }

    const showMobileSearch = () => {
        setSearchBarVisible(true)
    }

    const hideMobileSearch = () => {
        setSearchBarVisible(false)
    }


    return (
        <header className={`sticky top-0 border-b-2 px-6 ${snap.darkTheme ? 'header-dark' : 'header-light'}`}>
            <div className="flex h-20 items-center max-w-screen-lg mx-auto">
                <div className="flex-[2] flex md:flex-1 sm:gap-6 justify-between items-center h-full">
                    <button className="md:hidden flex justify-center items-center aspect-square rounded-full" onClick={() => state.showNavSidebar = true}>
                        <RxHamburgerMenu />
                    </button>
                    <button
                    className="md:hidden flex justify-center items-center aspect-square rounded-full"
                    onClick={showMobileSearch}>
                        <AiOutlineSearch />
                    </button>
                    <button className="w-min text-xl" role="link" onClick={() => navigate("/catalog")}>
                        <span>Total</span>
                        <span className="text-blue-400">Wash</span>
                    </button>
                </div>
                <div className="hidden md:flex flex-[2] border-2 justify-end  border-black rounded-sm h-9 focus-within:border-blue-500">
                    <input type="text" className={snap.darkTheme ? 'header-search-input-dark' : 'header-search-input'} placeholder="Search" />
                    <button className={snap.darkTheme ? 'header-search-btn-dark' : 'header-search-btn'}>
                        <AiOutlineSearch />
                    </button>
                </div>
                <div className="flex-1 justify-evenly gap-3 pl-3 hidden xxs:flex">
                    <div className="flex flex-1 justify-end">
                    {snap.darkTheme ?            
                    <button
                    onClick={setLightTheme}
                    className="flex items-center text-base gap-3 md:rounded-xl md:w-auto aspect-square md:aspect-auto rounded-full justify-center hover:underline underline-offset-4">
                        <MdLightMode />
                        <span className="hidden md:inline">Theme</span>
                    </button>
                    :
                    <button
                    onClick={setDarkTheme}
                    className="flex items-center text-base gap-3 md:rounded-xl md:w-auto aspect-square md:aspect-auto rounded-full justify-center hover:underline underline-offset-4">
                        <MdDarkMode />
                        <span className="hidden md:inline">Theme</span>
                    </button>
                    }
                    </div>
                    <div className="flex flex-1 justify-end">
                    <button
                    onClick={() => state.showCartSidebar = true}
                    className="flex items-center text-base gap-3 md:rounded-xl md:w-auto aspect-square md:aspect-auto rounded-full justify-center hover:underline underline-offset-4">
                        <RiShoppingCartLine />
                        <span className="hidden md:inline">Cart</span>
                    </button>
                    </div>
                </div>
            </div>
            <nav className="hidden w-full justify-between md:flex text-base flex-nowrap py-3 max-w-screen-lg mx-auto bg-inherit">
            {categories.map((category) =>
                <div className="relative group" key={category._id}>
                    <button
                    role="link"
                    onClick={() => navigate(`/catalog/${category.slug}`)}
                    onBlur={() => setDropdownVisible(true)}
                    onMouseLeave={() => setDropdownVisible(true)}
                    onFocus={() => setDropdownVisible(true)}>
                        <span>{category.name}</span>
                    </button>
                    <div className={`top-6 absolute flex-col group-hover:flex bg-inherit py-3 rounded shadow-lg ${dropdownVisible ? 'hidden' : '!hidden'} ${snap.darkTheme ? "header-dark" : "header-light"}`}>
                        {subcategories.map((subcategory) =>
                            subcategory.categories.map((savedCategory:any) =>
                                savedCategory._id === category._id &&
                                <div key={subcategory._id}>
                                    <button
                                    className={`py-3 px-6 w-full brightness-100 whitespace-nowrap bg-inherit flex items-center justify-start ${snap.darkTheme ? "header-dark hover:bg-[#5c5c5c]" : "header-light hover:brightness-95"}`}
                                    role="link"
                                    onClick={() => navigate(`/catalog/${subcategory.slug}`)}
                                    onBlur={() => setDropdownVisible(true)}>
                                        <span>{subcategory.name}</span>
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>
                )}
            </nav>
            {searchBarVisible && <MobileSearch closeSearch={hideMobileSearch}/>}
        </header>
    )
}