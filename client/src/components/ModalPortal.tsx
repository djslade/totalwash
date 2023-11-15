import { useModalScroll } from "@/hooks";
import React from "react";
import ReactDOM from "react-dom";

export const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const modalRoot = document.getElementById("modal-root");
  useModalScroll();
  return ReactDOM.createPortal(children, modalRoot as Element);
};
