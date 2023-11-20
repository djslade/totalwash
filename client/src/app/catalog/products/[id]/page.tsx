import { ProductPageInfo, RelatedProducts } from "@/components";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { ProductInfoName } from "@/components/ProductInfoName";
import { Product } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const getProduct = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${id}`,
    );
    const data = await res.json();
    return data?.product as Product;
  } catch (err) {
    notFound();
  }
};

const getRelatedProducts = async (productName: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?q=${productName}`,
  );
  const data = await res.json();
  const products = data?.products as Product[];
  const filteredProducts = products.filter(
    (product) => product.name !== productName,
  );
  return filteredProducts.slice(0, 6);
};

type Props = {
  params: { id: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  try {
    const id = params.id;
    const product = await getProduct(id);
    return {
      title: `${product.name} - TotalWash`,
    };
  } catch (err) {
    notFound();
  }
};

const Products = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const product = await getProduct(id);
  const relatedProducts = await getRelatedProducts(product.name);
  return (
    <main className="max-w-screen-lg mx-auto py-3">
      <div className="flex w-full my-3 sm:flex-row flex-col">
        <ProductInfoName productName={product.name} mobile />
        <ProductImageGallery product={product} />
        <ProductPageInfo product={product} />
      </div>
      <RelatedProducts products={relatedProducts} />
    </main>
  );
};

export default Products;
