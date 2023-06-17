import { Header, Navbar } from "@/components"
import { Footer } from "@/components/Footer"
import { Category } from "@/types"

const getCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/ranges`)
    const data = await res.json()
    return data?.ranges as Category[]
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
            <Footer />
        </>
    )
}

export default Layout