"use client"
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-start h-screen p-6 bg-landing text-white gap-12">
      <Link className="absolute top-6 left-6 text-2xl"  href="/catalog">
        <span>Total</span>
        <span className="text-blue-500">Wash</span>
      </Link>
      <section className="max-w-2xl flex flex-col justify-center items-start gap-12 brightness-100">
        <h1 className="text-6xl font-bold font-sans">Time to get clean</h1>
        <h2 className="text-xl font-semibold font-sans leading-10">Your washroom is sacred. At Totalwash we've consolidated everything you'll ever need for your bathroom in one simple store. Whatever you need, we've got you covered.</h2>
        <Link href="/catalog" className="uppercase bg-white text-black px-9 py-2 rounded-md border-black font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90">Continue to Store</Link>
      </section>
    </main>
  )
}
