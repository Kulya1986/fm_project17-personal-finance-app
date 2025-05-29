import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getPots } from "../../services/apiPots";
import { useUser } from "../authentication/useUser";

export function usePots() {
  const queryClient = useQueryClient();
  const { isLoading: userLoading, user, isAuthenticated } = useUser();
  const userId = user && isAuthenticated ? user.id : null;

  const {
    isLoading,
    error,
    data: { pots } = {},
  } = useQuery({
    queryKey: ["pots"],
    queryFn: () => getPots(userId),
  });

  return { isLoading, error, pots };
}
