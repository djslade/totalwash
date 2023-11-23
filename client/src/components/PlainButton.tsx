import React from "react";
import { ButtonProps } from "@/types";

export const PlainButton = ({ action, text }: ButtonProps) => {
  return (
    <button
      onClick={action}
      className="border py-1 bg-gray-50 text-gray-700 rounded-md border-gray-700 font-sans font-medium brightness-100 hover:bg-gray-200 focus:bg-gray-200 transition-all w-max px-3"
    >
      {text}
    </button>
  );
};
