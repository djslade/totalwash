import { Cart } from "@/components/Cart"
import { OrderSummary } from "@/components/OrderSummary"

const page = async () => {
    return (
        <main className="max-w-screen-lg mx-auto p-3">
            <h1 className="text-2xl font-medium">Your cart</h1>
            <div className="flex gap-6 flex-col-reverse md:flex-row items-center md:items-start">
                <Cart />
                <OrderSummary />
            </div>  
        </main>
    )
}

export default page