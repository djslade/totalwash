import { CatalogHeroSkeleton, PreviewSkeleton } from "@/components";

const CatalogLoading = () => {
  return (
    <main className="pt-3">
      <CatalogHeroSkeleton />
      <PreviewSkeleton />
    </main>
  );
};

export default CatalogLoading;
