import { CategoryInfoSkeleton, ProductsView } from "@/components";
import { ProductViewSkeleton } from "@/components/skeletons/ProductViewSkeleton";
import React from "react";

const loading = () => {
  return (
    <main className="max-w-screen-lg mx-auto py-3 w-screen">
      <div className="flex w-full my-3 sm:flex-row flex-col gap-3">
        <div className={`p-3 sm:hidden`}>
          <div className="h-5 bg-gray-300 animate-pulse rounded-md" />
        </div>
        <div className="flex-1 p-3 bg-gray-300 animate-pulse rounded-md" />
        <div className="flex-1">
          <div className={`p-3 hidden sm:block w-full`}>
            <div className="h-5 bg-gray-300 animate-pulse rounded-md w-full" />
          </div>
          <div className="my-3 text-2xl bg-gray-300 animate-pulse rounded-md h-6 p-3 w-full" />
          <div className="flex gap-3 my-12 text-sm xs:items-center flex-col xs:flex-row p-3 bg-gray-300 animate-pulse rounded-md w-full"></div>
          <div className="my-3 bg-gray-300 animate-pulse rounded-md w-full h-8"></div>
          <div className="my-3 bg-gray-300 animate-pulse rounded-md w-full h-5"></div>
          <div className="my-3 bg-gray-300 animate-pulse rounded-md w-full h-5"></div>
          <div className="my-3 bg-gray-300 animate-pulse rounded-md w-full h-5"></div>
          <div className="my-3 bg-gray-300 animate-pulse rounded-md w-full h-5"></div>
          <div className="my-3 bg-gray-300 animate-pulse rounded-md w-full h-5"></div>
        </div>
      </div>
      <ProductViewSkeleton />
    </main>
  );
};

export default loading;
