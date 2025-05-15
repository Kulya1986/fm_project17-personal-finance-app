import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBudget } from "../../services/apiBudgets";

export function useDeleteBudget() {
  const queryClient = useQueryClient();
  const { mutate: removeBudget, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteBudget(id),
    onSuccess: () => {
      toast.success("Budget successfully removed");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, removeBudget };
}
