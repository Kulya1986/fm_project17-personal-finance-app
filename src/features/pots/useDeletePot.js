import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePot } from "../../services/apiPots";
import toast from "react-hot-toast";

export function useDeletePot() {
  const queryClient = useQueryClient();
  const { mutate: removePot, isLoading: isDeleting } = useMutation({
    mutationFn: deletePot,
    onSuccess: () => {
      toast.success("Pot successfully removed");
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, removePot };
}
