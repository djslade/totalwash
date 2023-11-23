"use client";
import { useNavigate } from "@/hooks";
import { useEffect } from "react";
import { state } from "@/store";
import { PageWrapper, PlainButton } from "@/components";

const OrderCompletePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    state.cartId = "";
    localStorage.removeItem("cartId");
  }, []);

  return (
    <PageWrapper>
      <h1 className="text-2xl font-medium mb-6">Payment Complete</h1>
      <h2 className="mb-3">
        Thanks for shopping with Totalwash! Your items will be shipped to you as
        early as possible.
      </h2>
      <PlainButton action={() => navigate("/catalog")} text="Return to Store" />
    </PageWrapper>
  );
};

export default OrderCompletePage;
