"use client";
import { Product } from "@/types";
import { ProductsView } from "./ProductsView";
import { useState, useRef } from "react";
import { sortProductsArrayAlphabetically } from "@/utilities";
import { useUpdateParams } from "@/hooks";

export const SearchedProducts = ({
  products,
  relevance,
  total,
}: {
  products: Product[];
  relevance?: boolean;
  total?: number;
}) => {
  const [sortingMethod, setSortingMethod] = useState<string>(
    relevance ? "relevance" : "name",
  );

  const [limit, setLimit] = useState<number>(6);

  const sectionRef = useRef<HTMLElement>(null);

  const { setSearchParams, searchParams } = useUpdateParams();

  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1,
  );

  const handleSortingMethodChange = (evt: any) => {
    setSortingMethod(evt.target.value);
    setSearchParams("sortby", evt.target.value);
  };

  const handlePageLimitChange = (evt: any) => {
    setLimit(parseInt(evt.target.value));
    setSearchParams("limit", evt.target.value);
  };

  const sortProducts = () => {
    const productsCopy = [...products];
    switch (sortingMethod) {
      case "name":
        return productsCopy.sort(sortProductsArrayAlphabetically);
      case "low-high":
        return productsCopy.sort((a, b) => a.currentPrice - b.currentPrice);
      case "high-low":
        return productsCopy.sort((a, b) => b.currentPrice - a.currentPrice);
      case "relevance":
        return products;
      default:
        return products;
    }
  };

  const getPageButtonsArray = () => {
    const pageCount = Math.ceil((total || products.length) / limit);
    const array: number[] = [];
    for (let i = 0; i < pageCount; i += 1) {
      array.push(i + 1);
    }
    const startingSlice = (page < 3 ? 1 : page - 2) - 1;
    const endingSlice = page < 3 ? 5 : page + 2;
    if (array.length >= 5) {
      if (page === pageCount) {
        return array.slice(startingSlice - 2, endingSlice);
      }
      if (page === pageCount - 1) {
        return array.slice(startingSlice - 1, endingSlice);
      }
    }
    return array.slice(startingSlice, endingSlice);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams("page", `${newPage}`);
  };

  const goToPreviousPage = () => {
    if (page > 0) handlePageChange(page - 1);
  };

  const goToNextPage = () => {
    const pageCount = Math.ceil((total || products.length) / limit);
    if (page < pageCount) handlePageChange(page + 1);
  };

  if (products.length === 0) {
    return (
      <section className="w-full py-6" ref={sectionRef}>
        <h2>Your search returned no results.</h2>
      </section>
    );
  }

  return (
    <section className="w-full py-6" ref={sectionRef}>
      <div className="w-full xs:flex justify-between">
        <h1 className="font-medium my-6 text-gray-700">{`Showing ${
          page * limit - (limit - 1)
        }-${
          page * limit < (total || products.length)
            ? page * limit
            : total || products.length
        } of ${total || products.length} items`}</h1>
        <div className="flex items-center gap-3">
          <label>Sort By</label>
          <select
            className="py-1 px-3 rounded border-gray-700 bg-gray-100"
            onChange={handleSortingMethodChange}
          >
            {relevance && <option value="relevance">Relevance</option>}
            <option value="name">Product Name</option>
            <option value="high-low">Price High to Low</option>
            <option value="low-high">Price Low to High</option>
          </select>
        </div>
      </div>
      <ProductsView products={products} />
      <div className="w-full xs:flex justify-between items-center my-6">
        <div className="flex items-center gap-3">
          <label>Items per page</label>
          <select
            className="py-1 px-3 rounded text-sm bg-gray-100"
            onChange={handlePageLimitChange}
          >
            <option value="6">6</option>
            <option value="12">12</option>
          </select>
        </div>
        <div className="flex gap-3 font-semibold">
          <button onClick={goToPreviousPage} className="p-3">
            {"<"}
          </button>
          {getPageButtonsArray().map((pageNumber) => (
            <button
              className={`p-3 ${
                pageNumber === page
                  ? "bg-gray-200 border-gray-200 rounded-md"
                  : ""
              }`}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button onClick={goToNextPage} className="p-3">
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
};
