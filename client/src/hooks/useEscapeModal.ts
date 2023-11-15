import { useEffect } from "react";

export const useEscapeModal = (callback: () => void) => {
  useEffect(() => {
    const handleEscape = (evt: any) => {
      if (evt.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, []);
};
