import { PageWrapper, ProductViewSkeleton } from "@/components";
import React from "react";

const SearchLoading = () => {
  return (
    <PageWrapper>
      <ProductViewSkeleton />
      <ProductViewSkeleton />
    </PageWrapper>
  );
};

export default SearchLoading;
