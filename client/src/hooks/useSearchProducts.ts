import { useRouter } from "next/navigation";

export const useSearchProducts = () => {
  const router = useRouter();

  const search = (text: string) => {
    router.push(encodeURI(`/catalog/search?text=${text}`));
  };

  return search;
};
