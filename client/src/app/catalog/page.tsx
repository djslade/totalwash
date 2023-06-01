import { Category } from "@/types"

const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories`, { next: { revalidate: 60 }})
  const data = await res.json()
  return data?.categories as Category[]
}

const Catalog = async () => {
  const categories = await getCategories()

  return (
    <main className="max-w-screen-lg mx-auto py-3 flex flex-col gap-3">
      <section className="w-full flex flex-col-reverse md:flex-row bg-blue-400 text-white border rounded md:h-[400px]">
        <div className="md:flex-1 text-center p-5 flex flex-col justify-evenly items-center h-[250px] md:h-[400px]">
          <h1 className="text-2xl font-bold">Reinvent your bathroom</h1>
          <h2 className="text-xl">For a limited time you can save on select items in our store.</h2>
          <button className="w-48 uppercase bg-white text-black px-9 py-2 rounded-md border-black font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90">Shop Now</button>
        </div>
        <div className="md:flex-1 h-[400px]">
          <img src="/catalog-bathroom.jpg" className="h-full w-full"/>
        </div>
      </section>
      <section className="w-full flex flex-col gap-6 py-6">
        <h1 className="font-bold text-2xl">Shop Product Range</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-3 w-full place-content-between">
            {categories.map((category) =>
            <div key={category._id} className="relative max-w-xs min-w-min flex flex-col items-center">
              <img src={category.photo} alt={category.name} className="aspect-[4/5] w-full"/>
              <button className="xxs:absolute bottom-10 left-1/2 xxs:-translate-x-1/2 w-48 uppercase bg-white text-black px-9 py-2 rounded-md border-black font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90">{`Browse ${category.name}`}</button>
            </div>)}
        </div>
      </section>
    </main>
  )
}

export default Catalog
