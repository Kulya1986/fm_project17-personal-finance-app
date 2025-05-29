import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { addEditBudget } from "../../services/apiBudgets";

export function useAddBudget() {
  const queryClient = useQueryClient();
  const { mutate: addBudget, isLoading: isCreating } = useMutation({
    mutationFn: addEditBudget,
    onSuccess: () => {
      toast.success("New budget successfully created");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, addBudget };
}
