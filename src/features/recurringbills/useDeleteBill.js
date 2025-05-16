import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBill } from "../../services/apiRecurringBills";

export function useDeleteBill() {
  const queryClient = useQueryClient();
  const { mutate: removeBill, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBill,
    onSuccess: () => {
      toast.success("Bill successfully removed");
      queryClient.invalidateQueries({ queryKey: ["recurringBills"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, removeBill };
}
