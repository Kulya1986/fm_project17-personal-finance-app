import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addEditBudget } from "../../services/apiBudgets";

export function useUpdateBudget() {
  const queryClient = useQueryClient();
  const { mutate: updateBudget, isLoading: isEditing } = useMutation({
    mutationFn: ({ newBudgetData, id }) => addEditBudget(newBudgetData, id),
    onSuccess: () => {
      toast.success("Budget successfully created/updated");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, updateBudget };
}
