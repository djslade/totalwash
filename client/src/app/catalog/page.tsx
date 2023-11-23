import { Category, Product } from "@/types";
import {
  CatalogHero,
  FeaturedProducts,
  CategoryPreview,
  PageWrapper,
  CatalogBenefits
} from "@/components";

const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/ranges`, {
    cache: "no-store",
  });
  const data = await res.json();
  const categories = data?.ranges as Category[];
  const PageWrapperCategories = categories.filter(
    (range) => range.parents.length === 0,
  );
  return PageWrapperCategories;
};

const getFeaturedProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?featured=true`,
    { cache: "no-store" },
  );
  const data = await res.json();
  return data?.products as Product[];
};

const Catalog = async () => {
  const categoriesData = getCategories();

  const featuredProductsData = getFeaturedProducts();

  const [categories, featuredProducts] = await Promise.all([
    categoriesData,
    featuredProductsData,
  ]);

  return (
    <PageWrapper>
      <CatalogHero />
      <CategoryPreview categories={categories} heading={"Our Product Range"} />
      <FeaturedProducts products={featuredProducts} />
      <CatalogBenefits />
    </PageWrapper>
  );
};

export default Catalog;
