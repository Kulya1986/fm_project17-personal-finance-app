import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTotalSumByCategoryForMonth } from "../../services/apiTransactions";
import { useUser } from "../authentication/useUser";
import { useSearchParams } from "react-router";

export function useTotalSumByCategoryForMonth() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { isLoading: userLoading, user, isAuthenticated } = useUser();
  const userId = user && isAuthenticated ? user.id : null;

  const month =
    searchParams.get("month") && searchParams.get("month") !== "all"
      ? parseInt(searchParams.get("month"))
      : null;

  const year = searchParams.get("year")
    ? parseInt(searchParams.get("year"))
    : new Date().getFullYear();

  const {
    isLoading,
    error,
    data: { transactionsTotalPerBudget } = {},
  } = useQuery({
    queryKey: ["transactions_total_per_budget", year, month],
    queryFn: () =>
      getTotalSumByCategoryForMonth(
        {
          year,
          month,
        },
        userId
      ),
  });

  return { isLoading, transactionsTotalPerBudget, error };
}
