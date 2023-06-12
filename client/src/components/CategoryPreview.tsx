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
        <section className="w-full flex flex-col py-6">
            <div className="bg-blue-500 text-gray-50 font-bold text-xl my-6 w-full py-1 px-3">
                <h2>{heading}</h2>
            </div>  
            <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 gap-y-9 w-full gap-6">
                {categories.map((category) =>
                <div key={category._id} className="relative flex flex-col items-center rounded border aspect-square">
                <img src={category.photo} alt={category.name} className="h-full w-full object-cover"/>
                <button
                onClick={() => navigate(`${getNavigateUrl()}${category.slug}`)}
                className="text-sm xs:absolute bottom-10 left-3 right-3 uppercase bg-white text-black py-2 rounded-md border-black font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90">{`Browse ${category.name}`}</button>
                </div>)}
            </div>
        </section>
    )
}
