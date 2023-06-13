import { ShippingDetailsForm } from "@/components/ShippingDetailsForm"
import { CheckoutOrderSummary } from "@/components/CheckoutOrderSummary"

const page = () => {
    return (
        <main className="max-w-screen-lg mx-auto p-3">
            <h1 className="text-2xl font-medium">Shipping Details</h1>
            <div className="flex gap-6 flex-col-reverse md:flex-row items-center md:items-start">
                <ShippingDetailsForm />
                <CheckoutOrderSummary />
            </div>
        </main>
    )
}

export default page