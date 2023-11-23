import React from "react";

interface ProductsWrapperProps {
  children: React.ReactNode;
}
export const ProductsWrapper = ({ children }: ProductsWrapperProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xxs:grid-cols-2 w-full">
      {children}
    </div>
  );
};
