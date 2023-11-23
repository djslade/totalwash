import React from "react";

interface Props {
  children: React.ReactNode;
}
export const PageWrapper = ({ children }: Props) => {
  return <main className="pt-3">{children}</main>;
};
