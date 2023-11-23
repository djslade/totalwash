import { CategoryInfoSkeleton, PageWrapper } from "@/components";
import { ProductViewSkeleton } from "@/components/skeletons/ProductViewSkeleton";
import React from "react";

const SaleLoading = () => {
  return (
    <PageWrapper>
      <CategoryInfoSkeleton />
      <ProductViewSkeleton />
    </PageWrapper>
  );
};

export default SaleLoading;
