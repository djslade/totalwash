import React from "react";

interface HeadingBannerProps {
    heading: string;
}

export const HeadingBanner = ({ heading }: HeadingBannerProps) => {
  return (
    <div className="bg-gray-700 text-gray-100 font-bold text-xl my-6 w-full py-1 px-3">
      <h2>{heading}</h2>
    </div>
  );
};
