import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBudgets } from "../../services/apiBudgets";

import { useUser } from "../authentication/useUser";

export function useBudgets() {
  const queryClient = useQueryClient();
  const { isLoading: userLoading, user, isAuthenticated } = useUser();
  const userId = user && isAuthenticated ? user.id : null;

  const {
    isLoading,
    error,
    data: { budgets } = {},
  } = useQuery({
    queryKey: ["budgets"],
    queryFn: () => getBudgets(userId),
  });

  // queryClient.prefetchQuery({
  //   queryKey: ["categories_no_budgets"],
  //   queryFn: () => getCategoriesWithoutBudgets(),
  // });

  return { isLoading, error, budgets };
}
