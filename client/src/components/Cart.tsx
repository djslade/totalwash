"use client";
import { state } from "@/store";
import { useSnapshot } from "valtio";
import { MobileRenderedCartContents } from "./MobileRenderedCartContents";
import { RenderedCartContents } from "./RenderedCartContents";
import { useNavigate, useProcessCartContents } from "@/hooks";
import axios from "axios";
import { clearFocus } from "@/utilities";

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
      <section className="w-full-my-6 py-12">
        <h2>Your cart is empty.</h2>
        <div className="w-full flex justify-between py-3">
          <button
            onClick={() => navigate("/catalog")}
            className="border py-1 bg-gray-50 text-gray-700 rounded-md border-gray-700 font-sans font-medium hover:bg-gray-200 focus:bg-gray-200 transition-all w-max px-3"
          >
            Return to Store
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full my-6">
      <RenderedCartContents cartItems={cartItems} />
      <MobileRenderedCartContents cartItems={cartItems} />
      <div className="w-full flex items-center md:justify-between p-3 flex-col-reverse xxs:flex-row gap-3">
        <button
          onClick={() => navigate("/catalog")}
          className="border py-1 bg-gray-50 text-gray-700 rounded-md border-gray-700 font-sans font-medium brightness-100 hover:bg-gray-200 focus:bg-gray-200 transition-all w-max px-3"
        >
          Continue Shopping
        </button>
        <button
          onClick={clearCart}
          className="border py-1 bg-gray-50 text-gray-700 rounded-md border-gray-700 font-sans font-medium brightness-100 hover:bg-gray-200 focus:bg-gray-200 transition-all w-max px-3"
        >
          Clear Cart
        </button>
      </div>
    </section>
  );
};
