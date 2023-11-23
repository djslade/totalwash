"use client";
import React from "react";
import { RenderedCartProduct } from "./RenderedCartProduct";
import { RenderedProductButtons } from "./RenderedProductButtons";
import { formatPrice } from "@/utilities";
import { useCartItem } from "@/hooks";

export const MobileCartItem = ({ cartItem }: { cartItem: any }) => {
  const {
    quantity,
    handleQuantityChange,
    updateQuantityInCart,
    removeItemFromCart,
  } = useCartItem(cartItem);

  return (
    <div
      className="flex flex-col w-full border-b py-3 gap-3"
      key={cartItem.product._id}
    >
      <RenderedCartProduct product={cartItem.product} />
      <div className="w-full flex justify-between items-center">
        <div className="p-3 text-lg font-medium">
          {formatPrice(cartItem.product.currentPrice)}
        </div>
        <div className="p-3">
          <input
            onChange={handleQuantityChange}
            className="w-10 p-2 text-center border bg-gray-50"
            value={quantity}
          />
        </div>
        <div className="p-3 text-lg font-medium">
          {formatPrice(cartItem.subtotal)}
        </div>
      </div>
      <RenderedProductButtons
        handleUpdate={updateQuantityInCart}
        handleRemove={removeItemFromCart}
      />
    </div>
  );
};
