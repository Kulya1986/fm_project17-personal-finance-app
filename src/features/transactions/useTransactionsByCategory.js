import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactionsByCategory } from "../../services/apiTransactions";
import { useUser } from "../authentication/useUser";

export function useTransactionsByCategory(categoryId, amount) {
  const queryClient = useQueryClient();
  const { isLoading: userLoading, user, isAuthenticated } = useUser();

  const userId = user && isAuthenticated ? user.id : null;

  const {
    isLoading,
    error,
    data: { transactions } = {},
  } = useQuery({
    queryKey: ["transactions", categoryId, amount],
    queryFn: () => getTransactionsByCategory(categoryId, amount, userId),
  });

  return { isLoading, error, transactions };
}
