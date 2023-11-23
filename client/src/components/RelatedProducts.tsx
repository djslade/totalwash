import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { SectionWrapper } from "./SectionWrapper";
import { HeadingBanner } from "./HeadingBanner";
import { ProductsWrapper } from "./ProductsWrapper";

export const RelatedProducts = ({ products }: { products: Product[] }) => {
  return (
    <SectionWrapper>
      <HeadingBanner heading="Related Products" />
      <ProductsWrapper>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ProductsWrapper>
    </SectionWrapper>
  );
};
