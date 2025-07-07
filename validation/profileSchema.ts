import { z } from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  cpf: z
    .string()
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF deve estar no formato XXX.XXX.XXX-XX"
    )
    .optional()
    .or(z.literal("")),
  empresa: z
    .string()
    .max(100, "Nome da empresa deve ter no máximo 100 caracteres")
    .optional()
    .or(z.literal("")),
  age: z.string().min(1, "Idade obrigatória"),
  gender: z.string().min(1, "Gênero obrigatório"),
  branch_of_empresa: z
    .string()
    .max(50, "Setor deve ter no máximo 50 caracteres")
    .optional()
    .or(z.literal("")),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;
