"use client";
import { state } from "@/store";
import { useSnapshot } from "valtio";
import { MobileRenderedCartContents } from "./MobileRenderedCartContents";
import { RenderedCartContents } from "./RenderedCartContents";
import { useNavigate, useProcessCartContents } from "@/hooks";
import axios from "axios";
import { clearFocus } from "@/utilities";
import { SectionWrapper } from "./SectionWrapper";
import { PlainButton } from "./PlainButton";

export const Cart = () => {
  const snap = useSnapshot(state);

  const cartItems = useProcessCartContents();

  const navigate = useNavigate();

  const clearCart = async () => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/carts/${snap.cartId}`,
    );
    state.cartId = "";
    state.cartContents = [];
    localStorage.removeItem("cartId");
    clearFocus();
  };

  if (cartItems.length === 0 || !cartItems) {
    return (
      <SectionWrapper>
        <h2>Your cart is empty.</h2>
        <div className="w-full flex justify-between py-3">
          <PlainButton
            action={() => navigate("/catalog")}
            text="Return to Store"
          />
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <RenderedCartContents cartItems={cartItems} />
      <MobileRenderedCartContents cartItems={cartItems} />
      <div className="w-full flex items-center md:justify-between p-3 flex-col-reverse xxs:flex-row gap-3">
        <PlainButton
          action={() => navigate("/catalog")}
          text="Continue Shopping"
        />
        <PlainButton action={clearCart} text="Clear Cart" />
      </div>
    </SectionWrapper>
  );
};
