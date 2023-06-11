import { Cart } from "@/components/Cart"

const page = async () => {
    return (
        <main className="max-w-screen-lg mx-auto p-3">
            <h1 className="text-2xl font-medium">Your cart</h1>
            <Cart />
        </main>
    )
}

export default page