"use client";
import { Product } from "@/types";
import { ProductInfoName } from "./ProductInfoName";
import { ProductInfoPrice } from "./ProductInfoPrice";
import { ProductAddToCart } from "./ProductAddToCart";
import { ProductInfoText } from "./ProductInfoText";

export const ProductPageInfo = ({ product }: { product: Product }) => {
  return (
    <div className="flex-1">
      <ProductInfoName productName={product.name} />
      <ProductInfoPrice
        isOnSale={product.isOnSale}
        fullPrice={product.fullPrice}
        currentPrice={product.currentPrice}
      />
      <ProductAddToCart product={product} />
      <ProductInfoText
        heading={"Product Information"}
        textArray={product.description}
        textIsVisible
      />
      <ProductInfoText
        heading={"Features"}
        textArray={product.features}
        isList
      />
      {product.whatsIncluded.length > 0 && (
        <ProductInfoText
          heading={"What's Included"}
          textArray={product.whatsIncluded}
          isList
        />
      )}
    </div>
  );
};
