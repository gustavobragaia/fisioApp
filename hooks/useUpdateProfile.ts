import { useAuth } from "@/contexts/AuthContext";
import { updateUserProfile } from "@/lib/supabaseUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "react-native-toast-notifications";

export interface UpdateProfileData {
  name?: string;
  email?: string;
  cpf?: string;
  empresa?: string;
  setor?: string;
}

export const useUpdateProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      if (!user) throw new Error("User not authenticated");

      const { data: updatedUser, error } = await updateUserProfile(
        String(user?.id),
        data
      );

      if (error) {
        const errorMessage =
          (error as { message?: string }).message ?? "Unknown error";
        throw new Error(`Erro em atualizar o usuário: ${errorMessage}`);
      }

      return updatedUser;
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
    onError: (error) => {
      console.error("Erro ao atualizar perfil:", error);
      toast.show("Ocorreu um erro ao atualizar o perfil. Tente novamente.", {
        type: "danger",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
    },
  });
};
