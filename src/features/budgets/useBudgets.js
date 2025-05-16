import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBudgets } from "../../services/apiBudgets";
import { getCategoriesWithoutBudgets } from "../../services/apiCategories";

export function useBudgets() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: { budgets } = {},
  } = useQuery({
    queryKey: ["budgets"],
    queryFn: () => getBudgets(),
  });

  // queryClient.prefetchQuery({
  //   queryKey: ["categories_no_budgets"],
  //   queryFn: () => getCategoriesWithoutBudgets(),
  // });

  return { isLoading, error, budgets };
}
