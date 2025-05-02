import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getPots } from "../../services/apiPots";

export function usePots() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: { pots } = {},
  } = useQuery({
    queryKey: ["pots"],
    queryFn: () => getPots(),
  });

  return { isLoading, error, pots };
}
