import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { signup } from "@/lib/api/apiService";
import { useNavigate } from "react-router";

export default function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      console.log("Signing up with data:", data);
      const response = await signup(data);
      return response;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
 
      toast.success("You have successfully signed up.");

      if (data.user?.isOnboarded) {
        navigate("/");
      } else {
        navigate("/onboarding");
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Invalid email or password";

      toast.error(errorMessage);
    },
  });

  return {
    signupMutation: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
