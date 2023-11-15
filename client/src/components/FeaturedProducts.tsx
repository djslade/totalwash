import { Product } from "@/types";
import React from "react";
import { ProductsView } from "./ProductsView";

export const FeaturedProducts = ({ products }: { products: Product[] }) => {
  return (
    <section className="max-w-screen-lg mx-auto py-6">
      <div className="bg-gray-700 text-gray-100 font-bold text-xl my-6 w-full py-1 px-3">
        <h2>Featured Items</h2>
      </div>
      <ProductsView products={products} />
    </section>
  );
};
