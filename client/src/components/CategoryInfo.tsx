import { Category, Subcategory } from "@/types";
import { SectionWrapper } from "./SectionWrapper";

export const CategoryInfo = ({
  category,
}: {
  category: Category | Subcategory;
}) => {
  return (
    <SectionWrapper>
      <h1 className="font-bold text-xl my-6">{category.name}</h1>
      <h2 className="text my-6">{category.description}</h2>
    </SectionWrapper>
  );
};
