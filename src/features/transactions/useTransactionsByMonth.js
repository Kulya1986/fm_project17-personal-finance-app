import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactionsByMonth } from "../../services/apiTransactions";

export function useTransactionsByMonth({
  year = null,
  month = null,
  limit = null,
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
    queryKey: ["transactions", year, month, limit],
    queryFn: () =>
      getTransactionsByMonth({
        year,
        month,
        limit,
      }),
  });

  return { isLoading, error, transactions };
}
