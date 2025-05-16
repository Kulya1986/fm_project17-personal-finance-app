import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addEditRecurringBill } from "../../services/apiRecurringBills";

export function useEditBill() {
  const queryClient = useQueryClient();
  const { mutate: editBill, isLoading: isEditing } = useMutation({
    mutationFn: ({ newBill, id }) => addEditRecurringBill(newBill, id),
    onSuccess: () => {
      toast.success("New bill successfully created");
      queryClient.invalidateQueries({ queryKey: ["recurringBills"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editBill };
}
