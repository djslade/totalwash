import React from "react";
import { SectionWrapper } from "../SectionWrapper";

export const PreviewSkeleton = () => {
  return (
    <SectionWrapper>
      <div className="bg-gray-300 font-bold h-8 my-6 w-full py-1 px-3 animate-pulse rounded-md" />
      <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 gap-y-9 w-full gap-6">
        <div className="relative flex flex-col items-center rounded-md border aspect-square bg-gray-300 animate-pulse" />
        <div className="relative flex flex-col items-center rounded-md border aspect-square bg-gray-300 animate-pulse" />
        <div className="relative flex flex-col items-center rounded-md border aspect-square bg-gray-300 animate-pulse" />
        <div className="relative flex flex-col items-center rounded-md border aspect-square bg-gray-300 animate-pulse" />
        <div className="relative flex flex-col items-center rounded-md border aspect-square bg-gray-300 animate-pulse" />
        <div className="relative flex flex-col items-center rounded-md border aspect-square bg-gray-300 animate-pulse" />
      </div>
    </SectionWrapper>
  );
};
