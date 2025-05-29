import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants";
import { getRecurringBillsWithAgents } from "../../services/apiRecurringBills";
import { useUser } from "../authentication/useUser";

export function useRecurringBills() {
  const queryClient = useQueryClient();
  const { isLoading: userLoading, user, isAuthenticated } = useUser();
  const userId = user && isAuthenticated ? user.id : null;

  const {
    isLoading,
    error,
    data: { recurringBills, count } = {},
  } = useQuery({
    queryKey: ["recurringBills"],
    queryFn: () => getRecurringBillsWithAgents(userId),
  });

  return { isLoading, error, recurringBills, count };
}
