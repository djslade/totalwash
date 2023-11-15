"use client";
import { MobileCartItem } from "./MobileCartItem";

export const MobileRenderedCartContents = ({
  cartItems,
}: {
  cartItems: any[];
}) => {
  return (
    <div className="w-full sm:hidden flex flex-col gap-6">
      {cartItems.map((cartItem) => (
        <MobileCartItem cartItem={cartItem} key={cartItem.product._id} />
      ))}
    </div>
  );
};
