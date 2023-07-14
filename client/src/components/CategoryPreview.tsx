"use client"
import { Category, Subcategory } from "@/types"
import { useNavigate } from "@/hooks"

export const CategoryPreview = ({
    categories,
    heading,
}: {
    categories: Category[] | Subcategory[],
    heading: string,
}
) => {
    const navigate = useNavigate()

    const getNavigateUrl = () => {
        return "/catalog/categories/"
    }

    return (
        <section className="max-w-screen-lg mx-auto flex flex-col py-6">
            <div className="bg-gray-700 text-gray-50 font-bold text-xl my-6 w-full py-1 px-3">
                <h2>{heading}</h2>
            </div>  
            <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 gap-y-9 w-full gap-6">
                {categories.map((category) =>
                <div key={category._id} className="relative flex flex-col items-center rounded border aspect-square px-3">
                    <img src={category.photo} alt={category.name} className={"absolute inset-0 object-cover w-full h-full"} />
                    <button
                    onClick={() => navigate(`${getNavigateUrl()}${category.slug}`)}
                    className="w-full text-sm absolute bottom-10 uppercase bg-gray-100 text-gray-700 py-2 border-gray-700 font-sans font-bold hover:bg-gray-200 focus:bg-gray-200 transition-all">{`Browse ${category.name}`}</button>
                </div>)}
            </div>
        </section>
    )
}
