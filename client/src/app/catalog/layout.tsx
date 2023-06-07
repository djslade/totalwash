import { CartSidebar, Header, NavSidebar, ImageGalleryModal } from "@/components"
import { Category, Subcategory } from "@/types"

const getCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories`)
    const data = await res.json()
    return data?.categories as Category[]
}

const getSubcategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/subcategories`)
    const data = await res.json()
    return data?.subcategories as Subcategory[]
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
            <Header categories={categories} subcategories={subcategories} />
            {children}
        </>
    )
}

export default Layout