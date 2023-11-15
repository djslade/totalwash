"use client";
import { useNavigate } from "@/hooks";
import React from "react";

const CancelledOrderPage = () => {
  const navigate = useNavigate();

  return (
    <main className="max-w-screen-lg mx-auto p-3">
      <h1 className="text-2xl font-medium mb-6">Your order was cancelled</h1>
      <h2 className="mb-3">
        We&apos;ve saved all the items in your cart as well as your shipping
        information, so you can continue your purchase when you&apos;re good and
        ready.
      </h2>
      <button
        onClick={() => navigate("/catalog")}
        className="border py-1 bg-gray-50 text-gray-700 rounded-md border-gray-700 font-sans font-medium hover:bg-gray-200 focus:bg-gray-200 transition-all w-max px-3"
      >
        Return to Store
      </button>
    </main>
  );
};

export default CancelledOrderPage;
