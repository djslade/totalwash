import { Cart, OrderSummary, PageWrapper, SectionWrapper } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Cart - TotalWash",
};

const CartPage = () => {
  return (
    <PageWrapper>
      <SectionWrapper>
        <h1 className="text-2xl font-medium">Your cart</h1>
      </SectionWrapper>
      <SectionWrapper flex>
        <Cart />
        <OrderSummary />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default CartPage;
