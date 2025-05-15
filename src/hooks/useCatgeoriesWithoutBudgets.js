import { useQuery } from "@tanstack/react-query";

import { getCategoriesWithoutBudgets } from "../services/apiCategories";

export function useCategoriesWithoutBudgets() {
  const {
    isLoading,
    error,
    data: { categories } = {},
  } = useQuery({
    queryKey: ["categories_no_budgets"],
    queryFn: () => getCategoriesWithoutBudgets(),
  });

  return { isLoading, error, categories };
}
