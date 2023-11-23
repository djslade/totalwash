import { Product } from "@/types";
import React from "react";
import { ProductsView } from "./ProductsView";
import { SectionWrapper } from "./SectionWrapper";
import { HeadingBanner } from "./HeadingBanner";

export const FeaturedProducts = ({ products }: { products: Product[] }) => {
  return (
    <SectionWrapper>
      <HeadingBanner heading="Featured Items" />
      <ProductsView products={products} />
    </SectionWrapper>
  );
};
