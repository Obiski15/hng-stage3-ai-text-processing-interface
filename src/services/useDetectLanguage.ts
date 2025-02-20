import { useQuery } from "@tanstack/react-query";
import { detectLanguage } from "./AI";

export function useDetectLanguage(value: string) {
  const { data, error, isLoading } = useQuery({
    queryFn: () => detectLanguage(value),
    queryKey: ["detectLanguage", value],
    enabled: !!value,
  });

  return { data, error, isLoading };
}
