import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditPot } from "../../services/apiPots";
import toast, { Toaster } from "react-hot-toast";

export function useEditPot() {
  const queryClient = useQueryClient();
  const { mutate: editPot, isLoading: isEditing } = useMutation({
    mutationFn: ({ updatedPotData, id }) => addEditPot(updatedPotData, id),
    onSuccess: () => {
      toast.success("Pot successfully updated");
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editPot };
}
