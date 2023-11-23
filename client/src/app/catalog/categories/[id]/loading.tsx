import { CategoryInfoSkeleton, PageWrapper, PreviewSkeleton } from "@/components";
import { ProductViewSkeleton } from "@/components/skeletons/ProductViewSkeleton";
import React from "react";

const CategoriesLoading = () => {
  return (
    <PageWrapper>
      <CategoryInfoSkeleton />
      <PreviewSkeleton />
      <ProductViewSkeleton />
    </PageWrapper>
  );
};

export default CategoriesLoading;
