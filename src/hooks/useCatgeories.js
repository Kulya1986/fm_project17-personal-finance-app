import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getCategories } from "../services/apiCategories";

export function useCategories() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: { categories } = {},
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  return { isLoading, error, categories };
}
