import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactionsByMonth } from "../../services/apiTransactions";
import { useUser } from "../authentication/useUser";

export function useTransactionsByMonth({
  year = null,
  month = null,
  limit = null,
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
    queryKey: ["transactions", year, month, limit],
    queryFn: () =>
      getTransactionsByMonth(
        {
          year,
          month,
          limit,
        },
        userId
      ),
  });

  return { isLoading, error, transactions };
}
