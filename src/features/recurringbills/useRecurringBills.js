import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants";
import { getRecurringBillsWithAgents } from "../../services/apiRecurringBills";

export function useRecurringBills() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: { recurringBills, count } = {},
  } = useQuery({
    queryKey: ["recurringBills"],
    queryFn: () => getRecurringBillsWithAgents(),
  });

  return { isLoading, error, recurringBills, count };
}
