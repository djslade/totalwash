import { Header, Navbar } from "@/components"
import { Category } from "@/types"
import { cookies } from "next/dist/client/components/headers"

const getCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/ranges`)
    const data = await res.json()
    return data?.ranges as Category[]
}

const getCart = async (cartId:string) => {
    console.log(cartId)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/carts/${cartId}`)
    const data = await res.json()
    console.log(data?.cart)
    return data?.cart
}

const Layout = async ({
    children,
}: {
    children: React.ReactNode,
}) => {
    
    const query = await getCategories()

    const categories = query.filter((category) => category.parents.length === 0)

    const subcategories = query.filter((category) => category.parents.length > 0)

    
    return (
        <>
            <Header categories={categories} subcategories={subcategories} />
            <Navbar categories={categories} subcategories={subcategories} />
            {children}
        </>
    )
}

export default Layout