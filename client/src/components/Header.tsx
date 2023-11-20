"use client";
import { state } from "@/store";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSnapshot } from "valtio";
import { useRouter } from "next/navigation";
import { Category, Product } from "@/types";
import { useSearchProducts } from "@/hooks";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { MobileSearch } from "./MobileSearch";
import { NavSidebar } from "./NavSidebar";

export const Header = ({
  categories,
  subcategories,
}: {
  categories: Category[];
  subcategories: Category[];
}) => {
  const snap = useSnapshot(state);

  const [searchBarVisible, setSearchBarVisible] = useState<boolean>(false);

  const [showNavSidebar, setShowNavSidebar] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const search = useSearchProducts();

  const router = useRouter();

  const navigate = (path: string) => {
    if (router) {
      router.push(path);
    }
  };

  const showMobileSearch = () => {
    setSearchBarVisible(true);
  };

  const hideMobileSearch = () => {
    setSearchBarVisible(false);
  };

  const handleSearchClick = () => {
    if (!inputRef.current) return;
    if (!inputRef.current.value) return;
    search(inputRef.current.value);
  };

  const getCartProducts = async (id: string) => {
    const cartProducts = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/carts/${id}`,
    );
    if (!cartProducts.data?.cart?.products) return [] as Product[];
    return cartProducts.data.cart.products as Product[];
  };

  useEffect(() => {
    if (snap.cartId) return;
    const cartId = localStorage.getItem("cartId") || "";
    if (!cartId) return;
    state.cartId = cartId;
    getCartProducts(cartId).then((response) => (state.cartContents = response));
  }, []);

  useEffect(() => {
    const checkForSubmit = (evt: KeyboardEvent) => {
      if (evt.key !== "Enter") return;
      if (document.activeElement !== inputRef.current) return;
      handleSearchClick();
    };

    document.addEventListener("keydown", checkForSubmit);

    return () => document.addEventListener("keydown", checkForSubmit);
  });

  return (
    <>
      <div className="relative">
        <header className={`z-50 sticky top-0 px-6 bg-gray-700 text-gray-100`}>
          <div className="flex h-20 items-center max-w-screen-lg mx-auto p-3 md:justify-start justify-between">
            <div className="flex md:flex-1 gap-6 items-center h-full">
              <button
                className="md:hidden flex justify-center items-center outline-offset-8"
                onClick={() => setShowNavSidebar(true)}
              >
                <RxHamburgerMenu />
              </button>
              <button
                className="text-xl hidden md:flex outline-offset-8"
                role="link"
                onClick={() => navigate("/catalog")}
              >
                <span>Total</span>
                <span className="text-blue-400">Wash</span>
              </button>
            </div>
            <div className="hidden md:flex flex-[2] border-2 justify-end border-gray-700 rounded-sm h-9 focus-within:border-blue-500 bg-gray-500">
              <input
                ref={inputRef}
                type="text"
                className="py-3 pl-5 w-full outline-none text-base bg-gray-500"
                placeholder="Search"
              />
              <button
                className="w-12 aspect-square flex justify-center items-center hover:bg-gray-400 focus:bg-gray-400 transition-all"
                onClick={handleSearchClick}
              >
                <AiOutlineSearch />
              </button>
            </div>
            <div className="md:hidden">
              <button
                className="text-xl outline-offset-8"
                role="link"
                onClick={() => navigate("/catalog")}
              >
                <span>Total</span>
                <span className="text-blue-400">Wash</span>
              </button>
            </div>
            <div className="md:flex-1 justify-evenly items-center gap-6 md:gap-3 pl-3 flex">
              <div className="flex flex-1 md:justify-end justify-between w-full gap-6 items-center">
                <button
                  className="md:hidden flex justify-center items-center aspect-square outline-offset-8"
                  onClick={showMobileSearch}
                >
                  <AiOutlineSearch />
                </button>
                <button
                  onClick={() => navigate("/checkout/cart")}
                  className="flex items-center text-base gap-3 md:w-auto aspect-square md:aspect-auto justify-center hover:underline underline-offset-4 outline-offset-8"
                >
                  <div className="relative">
                    <RiShoppingCartLine />
                  </div>
                  <span className="hidden md:inline">Cart</span>
                </button>
              </div>
            </div>
          </div>
        </header>
        <AnimatePresence>
          {searchBarVisible && <MobileSearch closeSearch={hideMobileSearch} />}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showNavSidebar && (
          <NavSidebar
            categories={categories}
            subcategories={subcategories}
            isVisible={showNavSidebar}
            closeModal={() => setShowNavSidebar(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
