import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBudgets } from "../../services/apiBudgets";

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

  return { isLoading, error, budgets };
}
