import {
  ShippingDetailsForm,
  CheckoutOrderSummary,
  ShowOrderSummaryButton,
  PageWrapper,
  SectionWrapper,
} from "@/components";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

const getCart = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/carts/${id}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data?.cart;
  } catch (err) {
    notFound();
  }
};

export const metadata: Metadata = {
  title: "Shipping Details - TotalWash",
};

const Shipping = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const cart = await getCart(id);

  if (!cart) redirect("/checkout/cart");

  const { products, shippingInfo, discount, _id } = cart;

  return (
    <PageWrapper>
      <SectionWrapper>
        <h1 className="text-2xl font-medium">Shipping Details</h1>
      </SectionWrapper>
      <SectionWrapper flex>
        <ShippingDetailsForm shippingInfo={shippingInfo} cartId={_id} />
        <CheckoutOrderSummary products={products} discount={discount} />
        <ShowOrderSummaryButton products={products} discount={discount} />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default Shipping;
