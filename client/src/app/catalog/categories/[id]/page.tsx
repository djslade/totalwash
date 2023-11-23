import { Category, Product, Subcategory } from "@/types";
import {
  CategoryPreview,
  CategoryInfo,
  SearchedProducts,
  PageWrapper,
} from "@/components";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSearchParamsString } from "@/utilities";

const getCategory = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/ranges/${id}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data?.range as Category;
  } catch (err) {
    notFound();
  }
};

const getSubcategories = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/ranges?parent=${id}`,
    { cache: "no-store" },
  );
  const data = await res.json();
  return data?.ranges as Subcategory[];
};

const getProducts = async (id: string, searchParams: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?range=${id}${searchParams}`,
    { next: { revalidate: 0 } },
  );
  const data = await res.json();
  const products = data?.products as Product[];
  const total = data?.total as number;
  return { products, total };
};

type Props = {
  params: { id: string };
  searchParams: { page: string; limit: string; sortby: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  try {
    const id = params.id;
    const category = await getCategory(id);
    return {
      title: `${category.name} - TotalWash`,
    };
  } catch (err) {
    notFound();
  }
};

const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: string; limit: string; sortby: string };
}) => {
  const searchParamsString = getSearchParamsString(searchParams);

  const { id } = params;

  const category = await getCategory(id);

  const subcategories =
    category.parents.length === 0 ? await getSubcategories(category._id) : null;

  const { products, total } = await getProducts(
    category._id,
    searchParamsString,
  );

  return (
    <PageWrapper>
      <CategoryInfo category={category} />
      {subcategories && (
        <CategoryPreview categories={subcategories} heading="Subcategories" />
      )}
      <SearchedProducts products={products} total={total} />
    </PageWrapper>
  );
};

export default page;
