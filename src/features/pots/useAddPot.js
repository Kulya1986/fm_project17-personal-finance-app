import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addEditPot } from "../../services/apiPots";
import toast, { Toaster } from "react-hot-toast";

export function useAddPot() {
  const queryClient = useQueryClient();
  const { mutate: addPot, isLoading: isCreating } = useMutation({
    mutationFn: addEditPot,
    onSuccess: () => {
      toast.success("New pot successfully created");
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, addPot };
}
