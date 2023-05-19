import { CartSidebar, Header, NavSidebar } from "@/components"

const getCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories`)
    const data = await res.json()
    return data?.categories as any[]
}

const getSubcategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/subcategories`)
    const data = await res.json()
    return data?.subcategories as any[]
}

const Layout = async ({
    children,
}: {
    children: React.ReactNode,
}) => {
    const categories = await getCategories()

    const subcategories = await getSubcategories()

    return (
        <>
            <NavSidebar categories={categories} subcategories={subcategories} />
            <CartSidebar />
            <Header categories={categories} subcategories={subcategories} />
            {children}
        </>
    )
}

export default Layout