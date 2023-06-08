"use client"
import { useNavigate } from "@/hooks"

export const CatalogHero = () => {
    const navigate = useNavigate()

    return (
        <section className="w-full flex flex-col-reverse md:flex-row bg-blue-400 text-white border rounded md:h-[400px]">
            <div className="md:flex-1 text-center p-5 flex flex-col justify-evenly items-center h-[250px] md:h-[400px]">
            <h1 className="text-2xl font-bold">Reinvent your bathroom</h1>
            <h2 className="text-xl">For a limited time you can save on select items in our store.</h2>
            <button
            onClick={() => navigate("/catalog/sale")}
            className="w-48 uppercase bg-white text-black px-9 py-2 rounded-md border-black font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90">Shop Now</button>
            </div>
            <div className="md:flex-1 h-[400px]">
            <img src="/catalog-bathroom.jpg" className="h-full w-full"/>
            </div>
        </section>
    )
}
