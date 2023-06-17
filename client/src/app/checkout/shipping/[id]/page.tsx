import { ShippingDetailsForm } from "@/components/ShippingDetailsForm"
import { CheckoutOrderSummary } from "@/components/CheckoutOrderSummary"
import { ShowOrderSummaryButton } from "@/components/ShowOrderSummaryButton"
import { notFound, redirect } from "next/navigation"
import { Metadata } from "next"

const getCart = async (id:string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/carts/${id}`, { cache: "no-store" })
        const data = await res.json()
        return data?.cart
    } catch (err) {
        notFound()
    }
}

export const metadata:Metadata = {
    title: 'Shipping Details - TotalWash'
}

const page = async ({
    params,
}: {
    params: { id: string }
}) => {
    const { id } = params

    const cart = await getCart(id)

    if (!cart) redirect('/checkout/cart')
    
    const { products, shippingInfo, discount, _id } = cart

    return (
        <main className="max-w-screen-lg mx-auto p-3">
            <h1 className="text-2xl font-medium">Shipping Details</h1>
            <div className="flex gap-6 flex-col-reverse md:flex-row items-center md:items-start justify-between w-full">
                <ShippingDetailsForm shippingInfo={shippingInfo} cartId={_id}/>
                <CheckoutOrderSummary products={products} discount={discount}/>
                <ShowOrderSummaryButton products={products} discount={discount}/>
            </div>
        </main>
    )
}

export default page