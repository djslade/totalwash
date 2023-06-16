"use client"
import Link from 'next/link'

const Home = () => {
  return (
    <main className="bg-landing text-white h-screen w-screen flex items-center max-w-full max-h-full">
      <section className="px-10 max-w-xl">
        <div className="xxs:mb-10 mb-5">
          <h1 className="text-5xl font-bold font-sans">The Total Package</h1>
        </div>
        <div className="xxs:mb-14 mb-6">
          <h2 className="text-xl font-medium font-sans leading-10">Everyone deserves a beautiful bathroom. With an incredible range of washroom furniture across our store, you'll find everything you need to make your dreams a reality.</h2>
        </div>
        <div className="">
          <Link href="/catalog" className="text-center uppercase bg-gray-100 text-gray-700 text-sm px-5 whitespace-nowrap py-2 rounded-md border-black font-sans font-bold hover:bg-gray-200 focus:bg-gray-200 transition-all">Continue to Store</Link>
        </div>
      </section>
    </main>
  )
}

export default Home