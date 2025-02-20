import { useMutation } from "@tanstack/react-query";
import { translateLanguage } from "./AI";

export function useTranslateLanguage() {
  const {
    data,
    error,
    mutate,
    isPending: isLoading,
  } = useMutation({
    mutationFn: translateLanguage,
    mutationKey: ["translate"],
  });

  return { data, error, mutate, isLoading };
}
