import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactionsForBudgets } from "../../services/apiTransactions";
import { useUser } from "../authentication/useUser";
import { useSearchParams } from "react-router";

export function useTransactionsForBudgets({ categoryId = null }) {
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
    data: { transactions } = {},
  } = useQuery({
    queryKey: ["transactions", year, month, categoryId],
    queryFn: () =>
      getTransactionsForBudgets(
        {
          year,
          month,
          categoryId,
        },
        userId
      ),
  });

  return { isLoading, error, transactions };
}
