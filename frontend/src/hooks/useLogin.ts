import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { login } from "@/lib/api/apiService";
import { useNavigate } from "react-router";
import { log } from "console";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await login(data);
      return response;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
      if (data.user?.isOnboarded) {
        navigate("/login");
      } else {
        navigate("/onboarding");
      }
      toast.success("You have successfully signed in.");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Invalid email or password";

      toast.error(errorMessage);
    },
  });

  return {
    loginMutation: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
