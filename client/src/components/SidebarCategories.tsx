import { Category } from "@/types"
import { Dispatch, SetStateAction } from "react"
import { AiOutlineRight } from "react-icons/ai"

export const SidebarCategories = (
    {
        categories,
        setSelectedCategory,
    }
    :{
        categories:Category[],
        setSelectedCategory:Dispatch<SetStateAction<Category>>,
    }
) => {
  return (
    <nav className="justify-between items-start flex flex-col text-base flex-nowrap w-full whitespace-nowrap">
        <div className="text-xl font-bold bg-gray-200 w-full h-16 px-6 flex items-center">
            <span>Total</span>
            <span className="text-blue-400">Wash</span>
        </div>
        {categories.map((category) =>
        <div className="border-b-2" key={category._id}>
            <button className="py-3 flex items-center justify-between w-72 px-6 h-20" role="link" onClick={() => setSelectedCategory(category)}>
                <span>{category.name}</span>
                <AiOutlineRight />
            </button>
        </div>
        )}
    </nav>
  )
}
