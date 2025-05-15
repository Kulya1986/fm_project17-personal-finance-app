import { useQuery } from "@tanstack/react-query";
import { getAgents } from "../services/apiAgents";

export function useAgents() {
  const {
    isLoading,
    error,
    data: { agents } = {},
  } = useQuery({
    queryKey: ["agents"],
    queryFn: () => getAgents(),
  });

  return { isLoading, error, agents };
}
