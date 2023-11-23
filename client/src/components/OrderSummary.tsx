"use client";
import { useNavigate } from "@/hooks";
import { state } from "@/store";
import { formatPrice } from "@/utilities";
import React from "react";
import { useSnapshot } from "valtio";
import { PrimaryButton } from "./PrimaryButton";

export const OrderSummary = () => {
  const snap = useSnapshot(state);

  const getTotalCartPrice = () => {
    const priceArray = snap.cartContents.map((product) => product.currentPrice);
    const total = priceArray.reduce((total, price) => total + price, 0);
    return formatPrice(total);
  };

  const navigate = useNavigate();

  return (
    <div
      className={`w-full max-w-[300px] h-max shadow-md bg-gray-200 rounded-md mt-6 ${
        snap.cartContents.length > 0 ? "block" : "hidden"
      }`}
    >
      <div className="w-full pb-3 border-b p-5">
        <h1>Summary</h1>
      </div>
      <div className="p-5 pb-3 border-b flex flex-col gap-3">
        <div className="flex w-full justify-between">
          <h2>Subtotal</h2>
          <h2 className="font-medium">{getTotalCartPrice()}</h2>
        </div>
        <div className="flex w-full justify-between">
          <h2>Discount</h2>
          <h2 className="font-medium">{formatPrice(0)}</h2>
        </div>
        <div className="flex w-full justify-between mt-5">
          <h2>Order Total</h2>
          <h2 className="font-medium">{getTotalCartPrice()}</h2>
        </div>
      </div>
      <div className="w-full flex justify-center py-5 px-2">
        <PrimaryButton
          action={() => navigate(`/checkout/shipping/${snap.cartId}`)}
          text="Proceed to checkout"
        />
      </div>
    </div>
  );
};
