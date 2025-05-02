import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactionsForBudgets } from "../../services/apiTransactions";

export function useTransactionsForBudgets({
  year = null,
  month = null,
  categoryId = null,
  num = null,
}) {
  const queryClient = useQueryClient();

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
      getTransactionsForBudgets({
        year,
        month,
        categoryId,
      }),
  });

  return { isLoading, error, transactions };
}
