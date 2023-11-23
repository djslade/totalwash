import { Product } from "@/types";
import React from "react";
import { ProductCard } from "./ProductCard";
import { ProductsWrapper } from "./ProductsWrapper";

export const ProductsView = ({ products }: { products: Product[] }) => {
  return (
    <ProductsWrapper>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </ProductsWrapper>
  );
};
