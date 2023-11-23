import React from "react";
import { CatalogBenefitsItem } from "./CatalogBenefitsItem";

export const CatalogBenefits = () => {
  return (
    <section className="w-full md:h-96 bg-gray-200 text-gray-700 flex justify-center items-center py-3">
      <div className="p-3 rounded-lg max-w-screen-lg md:flex-1 bg-white md:h-2/3 md:shadow-md flex flex-col md:flex-row">
        <CatalogBenefitsItem
          src={"/delivery.webp"}
          heading="Quick Delivery"
          subheading="Shipped directly to you either standard or express."
        />
        <CatalogBenefitsItem
          src={"/securedark.webp"}
          heading="Secure Payments"
          subheading="AES-256 encryption keeps your details 100% secure."
        />
        <CatalogBenefitsItem
          src={"/installation.webp"}
          heading="Free Installation"
          subheading="Installation included on every order free of charge."
        />
      </div>
    </section>
  );
};
