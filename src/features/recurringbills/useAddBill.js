import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addEditRecurringBill } from "../../services/apiRecurringBills";

export function useAddBill() {
  const queryClient = useQueryClient();
  const { mutate: addBill, isLoading: isCreating } = useMutation({
    mutationFn: addEditRecurringBill,
    onSuccess: () => {
      toast.success("New bill successfully created");
      queryClient.invalidateQueries({ queryKey: ["recurringBills"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, addBill };
}
