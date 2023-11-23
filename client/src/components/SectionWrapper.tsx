import React, { MutableRefObject } from "react";

interface Props {
  children: React.ReactNode;
  flex?: boolean;
}
export const SectionWrapper = ({ children, flex }: Props) => {
  return (
    <section
      className={`max-w-screen-lg mx-auto py-6 px-3 ${
        flex ? "flex sm:flex-row flex-col" : null
      }`}
    >
      {children}
    </section>
  );
};
