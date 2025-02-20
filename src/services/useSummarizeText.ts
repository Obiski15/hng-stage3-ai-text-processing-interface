import { useMutation } from "@tanstack/react-query";
import { summarizeText } from "./AI";

export function useSummarizeText() {
  const {
    data,
    mutate,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationFn: summarizeText,
    mutationKey: ["summarize"],
  });

  return { data, mutate, error, isLoading };
}
