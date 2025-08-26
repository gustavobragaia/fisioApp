import { useAuth } from "@/contexts/AuthContext";
import { UserUpdateData, updateUserProfile } from "@/lib/userUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "react-native-toast-notifications";

export const useUpdateProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (updates: UserUpdateData) => {
      if (!user?.id) throw new Error("User not authenticated");
      return await updateUserProfile(user.id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-data"] });
      toast.show("Perfil atualizado com sucesso!", {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
    },
    onError: (error: Error) => {
      console.error("Erro ao atualizar perfil:", error);
      toast.show(error.message || "Ocorreu um erro ao atualizar o perfil. Tente novamente.", {
        type: "danger",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
    },
  });
};
