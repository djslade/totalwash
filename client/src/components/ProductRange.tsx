"use client"
import { useRouter } from "next/navigation"
import { Category } from "@/types"

export const ProductRange = ({
    categories,
}: {
    categories: Category[],
}
) => {
    const router = useRouter()

    const navigate = (path:string) => {
      if (router) {
        router.push(path)
      }
    }
    
    return (
        <section className="w-full flex flex-col py-6">
            <h1 className="font-bold text-2xl my-6">Shop Product Range</h1>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-y-9 w-full gap-6">
                {categories.map((category) =>
                <div key={category._id} className="relative flex flex-col items-center rounded border aspect-[4/5]">
                <img src={category.photo} alt={category.name} className="h-full w-full object-cover"/>
                <button
                onClick={() => navigate(`/catalog/${category.slug}`)}
                className="xxs:absolute bottom-10 left-3 right-3 uppercase bg-white text-black py-2 rounded-md border-black font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90">{`Browse ${category.name}`}</button>
                </div>)}
            </div>
        </section>
    )
}
