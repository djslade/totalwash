import { useRouter } from "next/navigation";

export const useNavigate = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    if (router) {
      router.push(path);
    }
  };

  return navigate;
};
