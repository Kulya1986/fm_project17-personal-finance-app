import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactionsForBudgets } from "../../services/apiTransactions";
import { useUser } from "../authentication/useUser";

export function useTransactionsForBudgets({
  year = null,
  month = null,
  categoryId = null,
}) {
  const queryClient = useQueryClient();
  const { isLoading: userLoading, user, isAuthenticated } = useUser();
  const userId = user && isAuthenticated ? user.id : null;

  // const year = 2025;
  // const month = 1;
  // const categoryId = null;

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
