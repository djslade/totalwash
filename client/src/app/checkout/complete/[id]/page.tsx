"use client"
import { useNavigate } from "@/hooks"
import axios from "axios"
import { useEffect } from "react"

const deleteCart = async (cartId:string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/carts/${cartId}`)
}

const page = ({
    params,
}: {
    params: { id: string }
}) => {
    const { id } = params

    const navigate = useNavigate()
    
    deleteCart(id)

    useEffect(() => {
        localStorage.removeItem('cartId')
    }, [])
    return (
        <main className="max-w-screen-lg w-screen mx-auto p-3">
            <h1 className="text-2xl font-medium mb-6">Payment Complete</h1>
            <h2 className="mb-3">Thanks for shopping with Totalwash! Your items will be shipped to you as early as possible.</h2>
            <button
            onClick={() => navigate('/catalog')}
            className="border py-1 bg-gray-50 text-gray-700 rounded-md border-gray-700 font-sans font-medium hover:bg-gray-200 focus:bg-gray-200 transition-all w-max px-3">Return to Store</button>
        </main>
    )
}

export default page