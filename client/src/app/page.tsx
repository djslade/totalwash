"use client"
import Link from 'next/link'

const Home = () => {
  return (
    <main className="bg-landing text-white gap-12 min-h-screen">
      <section className="p-10 max-w-2xl flex flex-col justify-between gap-12 brightness-100 h-fit my-auto absolute top-1/2 -translate-y-1/2">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold font-sans">The Total Package</h1>
        </div>
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl font-medium font-sans leading-10">Everyone deserves a beautiful bathroom. With an incredible range of washroom furniture across our store, you'll find everything you need to make your dreams a reality.</h2>
        </div>
        <div className="max-w-xl">
          <Link href="/catalog" className="text-center uppercase bg-white text-black px-9 whitespace-nowrap py-2 rounded-md border-black font-sans font-semibold brightness-100 hover:brightness-90 focus:brightness-90">Continue to Store</Link>
        </div>
      </section>
    </main>
  )
}

export default Home