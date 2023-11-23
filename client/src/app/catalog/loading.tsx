import { CatalogHeroSkeleton, PageWrapper, PreviewSkeleton } from "@/components";

const CatalogLoading = () => {
  return (
    <PageWrapper>
      <CatalogHeroSkeleton />
      <PreviewSkeleton />
    </PageWrapper>
  );
};

export default CatalogLoading;
