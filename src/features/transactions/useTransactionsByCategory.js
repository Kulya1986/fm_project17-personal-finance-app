import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactionsByCategory } from "../../services/apiTransactions";

export function useTransactionsByCategory(categoryId, amount) {
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: { transactions } = {},
  } = useQuery({
    queryKey: ["transactions", categoryId, amount],
    queryFn: () => getTransactionsByCategory(categoryId, amount),
  });

  return { isLoading, error, transactions };
}
