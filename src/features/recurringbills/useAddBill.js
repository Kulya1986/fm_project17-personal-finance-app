import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { addRecurringBill } from "../../services/apiRecurringBills";

export function useAddBill() {
  const queryClient = useQueryClient();
  const { mutate: addBill, isLoading: isCreating } = useMutation({
    mutationFn: addRecurringBill,
    onSuccess: () => {
      toast.success("New bill successfully created");
      queryClient.invalidateQueries({ queryKey: ["recurringBills"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, addBill };
}
