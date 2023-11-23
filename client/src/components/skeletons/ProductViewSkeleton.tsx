import React from "react";
import { SectionWrapper } from "../SectionWrapper";

export const ProductViewSkeleton = () => {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 md:grid-cols-3 xxs:grid-cols-2 w-full gap-3 gap-y-3 mt-20">
        <div className="p-3 border border-transparent hover:border-gray-500 rounded-md flex flex-col justify-between aspect-square bg-gray-300 animate-pulse w-full" />
        <div className="p-3 border border-transparent hover:border-gray-500 rounded-md flex flex-col justify-between aspect-square bg-gray-300 animate-pulse w-full" />
        <div className="p-3 border border-transparent hover:border-gray-500 rounded-md flex flex-col justify-between aspect-square bg-gray-300 animate-pulse w-full" />
        <div className="p-3 border border-transparent hover:border-gray-500 rounded-md flex flex-col justify-between aspect-square bg-gray-300 animate-pulse w-full" />
        <div className="p-3 border border-transparent hover:border-gray-500 rounded-md flex flex-col justify-between aspect-square bg-gray-300 animate-pulse w-full" />
        <div className="p-3 border border-transparent hover:border-gray-500 rounded-md flex flex-col justify-between aspect-square bg-gray-300 animate-pulse w-full" />
      </div>
    </SectionWrapper>
  );
};
