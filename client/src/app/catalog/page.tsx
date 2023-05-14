"use client"
import { state } from "@/store"
import Link from "next/link"
import { AiOutlineSearch } from 'react-icons/ai'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { RxHamburgerMenu } from 'react-icons/rx'
import { RiShoppingCartLine } from 'react-icons/ri'
import { useSnapshot } from "valtio"

const Catalog = () => {
  const snap = useSnapshot(state)

  const setDarkTheme = () => {
    state.darkTheme = true
  }

  const setLightTheme = () => {
    state.darkTheme = false
  }

  return (
    <>
      <header className={`sticky top-0 px-12 border-b-2 ${snap.darkTheme ? 'header-dark' : 'header-light'}`}>
        <div className="w-full py-3 flex justify-center items-center md:hidden">
            <Link className="text-xl"  href="/catalog">
              <span>Total</span>
              <span className="text-blue-400">Wash</span>
            </Link>
        </div>
        <div className="flex h-20 items-center">
          <div className="flex-[2] flex sm:flex-1 sm:gap-6">
            <button className="md:hidden w-12 flex justify-center items-center aspect-square rounded-full" onClick={() => state.showNavSidebar = true}>
              <RxHamburgerMenu />
            </button>
            <Link className="w-min hidden md:inline text-xl"  href="/catalog">
              <span>Total</span>
              <span className="text-blue-400">Wash</span>
            </Link>
          </div>
          <div className="flex xxs:flex-[3] sm:flex-[2] xxs:border-2 justify-end  border-black rounded-sm xxs:h-9 xxs:focus-within:border-blue-500">
            <input type="text" className={snap.darkTheme ? 'header-search-input-dark' : 'header-search-input'} placeholder="Search" />
            <button className={snap.darkTheme ? 'header-search-btn-dark' : 'header-search-btn'}>
              <AiOutlineSearch />
            </button>
          </div>
          <div className="flex-1 flex justify-end">
            {snap.darkTheme ?            
            <button
            onClick={setLightTheme}
            className="flex items-center text-base gap-3 md:rounded-xl md:w-auto w-12 aspect-square md:aspect-auto rounded-full justify-center hover:underline underline-offset-4">
              <MdLightMode />
              <span className="hidden md:inline">Theme</span>
            </button>
            :
            <button
            onClick={setDarkTheme}
            className="flex items-center text-base gap-3 md:rounded-xl md:w-auto w-12 aspect-square md:aspect-auto rounded-full justify-center hover:underline underline-offset-4">
              <MdDarkMode />
              <span className="hidden md:inline">Theme</span>
            </button>
            }
            <button className="font-bold md:hidden text-2xl w-12 aspect-square rounded-full flex justify-center items-center">
              <RiShoppingCartLine />
            </button>
          </div>
        </div>
        <nav className="hidden w-full justify-between md:flex text-base flex-nowrap py-3">
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
          <div className="hover:underline underline-offset-4">
            <Link href="/catalog/other">
              <span>Other</span>
            </Link>
          </div>
          <div className="hover:underline underline-offset-4">
            <button className="flex items-center gap-3 justify-center">
              <RiShoppingCartLine />
              <span className="">Cart</span>
            </button>
          </div>
        </nav>
      </header>
      <main>
      </main>
    </>
  )
}

export default Catalog