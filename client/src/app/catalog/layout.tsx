import { CartSidebar, Header, NavSidebar } from "@/components"

const Layout = async ({
    children,
}: {
    children: React.ReactNode,
}) => {
    return (
        <>
            <NavSidebar />
            <CartSidebar />
            <Header />
            {children}
        </>
    )
}

export default Layout