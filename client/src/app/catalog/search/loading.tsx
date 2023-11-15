import { ProductViewSkeleton } from "@/components";
import React from "react";

const SearchLoading = () => {
  return (
    <main className="max-w-screen-lg mx-auto p-3 w-screen">
      <ProductViewSkeleton />
      <ProductViewSkeleton />
    </main>
  );
};

export default SearchLoading;
