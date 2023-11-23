import { SectionWrapper } from "../SectionWrapper";

export const CategoryInfoSkeleton = () => {
  return (
    <SectionWrapper>
      <div className="h-7 my-7 w-1/2 bg-gray-300 animate-pulse rounded-md" />
      <div className="h-5 mb-2 w-full bg-gray-300 animate-pulse rounded-md" />
      <div className="h-5 mb-2 w-full bg-gray-300 animate-pulse rounded-md" />
      <div className="h-5 mb-5 w-1/2 bg-gray-300 animate-pulse rounded-md" />
    </SectionWrapper>
  );
};
