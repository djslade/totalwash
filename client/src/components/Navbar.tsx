"use client"
import { useNavigate } from "@/hooks"
import { state } from "@/store"
import { Category } from "@/types"
import { useState } from "react"
import { useSnapshot } from "valtio"

export const Navbar = ({
    categories,
    subcategories,
}: {
    categories: Category[],
    subcategories: Category[],
}) => {
    const snap = useSnapshot(state)

    const navigate = useNavigate()

    const [dropdownVisible, setDropdownVisible] = useState<boolean>(true)

    return (
        <div className="max-w-screen bg-gray-100">
            <nav className="hidden justify-between md:flex text-base flex-nowrap py-2 max-w-screen-lg mx-auto bg-inherit px-3">
                {categories.map((category) =>
                    <div className="relative group flex justify-center flex-col items-center" key={category._id}>
                        <button
                        role="link"
                        className="outline-offset-8"
                        onClick={() => navigate(`/catalog/categories/${category.slug}`)}
                        onBlur={() => setDropdownVisible(true)}
                        onMouseLeave={() => setDropdownVisible(true)}
                        onFocus={() => setDropdownVisible(true)}>
                            <span>{category.name}</span>
                        </button>
                        <div className={`top-6 ${categories.indexOf(category) === categories.length - 1 ? "right-0" : "-left-6"} absolute flex-col group-hover:flex py-3 rounded shadow-md ${dropdownVisible ? 'hidden' : '!hidden'} bg-gray-100`}>
                            {subcategories.map((subcategory) =>
                                subcategory.parents.map((savedCategory:any) =>
                                    savedCategory._id === category._id &&
                                    <div key={subcategory._id}>
                                        <button
                                        className={`py-3 px-6 w-full brightness-100 whitespace-nowrap bg-gray-100 flex items-center justify-start hover:bg-gray-200`}
                                        role="link"
                                        onClick={() => navigate(`/catalog/categories/${subcategory.slug}`)}
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
        </div>
    )
}
