import { useCallback, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const useUpdateParams = (scrollY?: number) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!scrollY) return;
    window.scrollTo({ top: Number(scrollY) });
  }, [searchParams]);

  const setSearchParams = useCallback(
    (key: string, value: string) => {
      const currentParams = searchParams.toString();
      const params = new URLSearchParams(currentParams);
      params.set(key, value);
      // If search params are still the same there's no need to do anything
      if (currentParams === params.toString()) return;

      // Save current scrollY value to localStorage before pushing the new route
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  return {
    setSearchParams,
    searchParams,
  };
};
