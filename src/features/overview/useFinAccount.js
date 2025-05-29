import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFinanceInfo } from "../../services/apiFinAccount";
import { useUser } from "../authentication/useUser";

export function useFinAccount() {
  const queryClient = useQueryClient();
  const { isLoading: userLoading, user, isAuthenticated } = useUser();

  // console.log(user);
  const userId = user && isAuthenticated ? user.id : null;

  const {
    isLoading,
    error,
    data: { finance } = {},
  } = useQuery({
    queryKey: ["finInfo"],
    queryFn: () => getFinanceInfo(userId),
  });

  return { isLoading, error, finance };
}
