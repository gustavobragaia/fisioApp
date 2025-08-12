import { updateUser } from "@/lib/supabaseUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "react-native-toast-notifications";

export interface UpdateUserAuthData {
  email?: string;
  password?: string;
  data?: Record<string, any>;
}

export const useUpdateUserAuth = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (updates: UpdateUserAuthData) => {
      console.log("Updating user with:", updates);
      const { user: updatedUser, error } = await updateUser(updates);

      console.log("User updated2:", updatedUser);

      if (error) {
        const message =
          (error as { message?: string })?.message ??
          "Erro desconhecido ao atualizar usuário";
        throw new Error(message);
      }

      return updatedUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-data"] });
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });

      toast.show("Dados de acesso atualizados com sucesso!", {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
    },
    onError: (error: any) => {
      console.error("Erro ao atualizar dados de acesso:", error);
      toast.show(
        error?.message ??
          "Ocorreu um erro ao atualizar seus dados. Tente novamente.",
        {
          type: "danger",
          placement: "top",
          duration: 3000,
          animationType: "slide-in",
        }
      );
    },
  });
};
