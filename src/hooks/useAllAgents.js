import { useQuery } from "@tanstack/react-query";
import { getAllAgents } from "../services/apiAgents";

export function useAllAgents() {
  const {
    isLoading,
    error,
    data: { agents } = {},
  } = useQuery({
    queryKey: ["agents_all"],
    queryFn: () => getAllAgents(),
  });

  return { isLoading, error, agents };
}
