import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTotalSumForTransactions } from "../../services/apiTransactions";
import { useUser } from "../authentication/useUser";

export function useTransactionsTotal() {
  const queryClient = useQueryClient();
  const { isLoading: userLoading, user, isAuthenticated } = useUser();
  const userId = user && isAuthenticated ? user.id : null;

  const {
    isLoading,
    error,
    data: { transactionsTotal } = {},
  } = useQuery({
    queryKey: ["transactionsTotal"],
    queryFn: () => getTotalSumForTransactions(userId),
  });

  return { isLoading, transactionsTotal, error };
}
