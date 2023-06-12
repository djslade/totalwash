"use client"
import { useNavigate } from "@/hooks"

export const CatalogHero = () => {
    const navigate = useNavigate()

    return (
        <section className="max-w-screen-lg mx-auto aspect-[4/5] md:aspect-[16/9] catalog-hero flex flex-col justify-center md:items-start">
            <div className="bg-blue-400 text-gray-50 p-3 rounded-lg flex flex-col gap-6 items-center xs:h-1/2 md:h-full md:w-1/2 justify-center h-full w-full bg-opacity-75">
                <h1 className="text-2xl font-bold text-center">Find your inspiration at a discount</h1>
                <div className="w-3/4 text-center">
                    <h2 className="text-xl font-medium">For a limited time you can save on select items across our whole store.</h2>
                </div>
                <button
                onClick={() => navigate("/catalog/sale")}
                className="w-48 uppercase border border-gray-50 bg-blue-400 hover:bg-gray-50 hover:border-blue-400 transition-all hover:text-blue-400 px-9 py-2 rounded-md font-sans font-bold">Shop Now</button>
            </div>
        </section>
    )
}
