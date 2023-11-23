import React from "react";
import { LazyImage } from "./LazyImage";

interface CatalogBenefitsItemProps {
  src: string;
  heading: string;
  subheading: string;
}

export const CatalogBenefitsItem = ({
  src,
  heading,
  subheading,
}: CatalogBenefitsItemProps) => {
  return (
    <div className="flex flex-col md:flex-1 items-center gap-2">
      <div className="w-full h-28 flex justify-center">
        <LazyImage source={src} alt={heading} classNames={"w-1/2"} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold">{heading}</span>
        <span className="text-center w-3/4">
          {subheading}
        </span>
      </div>
    </div>
  );
};
