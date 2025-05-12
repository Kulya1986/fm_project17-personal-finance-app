import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFinanceInfo } from "../../services/apiFinAccount";

export function useFinAccount() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: { finance } = {},
  } = useQuery({
    queryKey: ["finInfo"],
    queryFn: () => getFinanceInfo(),
  });

  return { isLoading, error, finance };
}
