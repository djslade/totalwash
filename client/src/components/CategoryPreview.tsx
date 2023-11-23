"use client";
import { Category, Subcategory } from "@/types";
import { useNavigate } from "@/hooks";
import { LazyImage } from "./LazyImage";
import { HeadingBanner } from "./HeadingBanner";
import { SectionWrapper } from "./SectionWrapper";

export const CategoryPreview = ({
  categories,
  heading,
}: {
  categories: Category[] | Subcategory[];
  heading: string;
}) => {
  const navigate = useNavigate();

  const getNavigateUrl = () => {
    return "/catalog/categories/";
  };

  return (
    <SectionWrapper>
      <HeadingBanner heading={heading} />
      <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 gap-y-9 w-full gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="relative flex flex-col items-center rounded border aspect-square px-3"
          >
            <LazyImage
              source={category.photo}
              alt={category.name}
              classNames="absolute inset-0 object-cover w-full h-full"
            />
            <button
              onClick={() => navigate(`${getNavigateUrl()}${category.slug}`)}
              className="w-full text-sm absolute bottom-10 uppercase bg-gray-100 text-gray-700 py-2 border-gray-700 font-sans font-bold hover:bg-gray-200 focus:bg-gray-200 transition-all"
            >{`Browse ${category.name}`}</button>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};
