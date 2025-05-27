import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/overview", { replace: true });
      toast.success("Logged in successfully");
    },
    onError: (err) => {
      console.log("ERROR", err.message);
      toast.error("Provided email or password is incorrect");
    },
  });

  return { login, isLogin };
}
