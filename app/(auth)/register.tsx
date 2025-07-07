import { Button } from "@/components/Button";
import colors from "@/styles/colors";
import { cpfMask } from "@/utils/cpfMask";
import { zodResolver } from "@hookform/resolvers/zod";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Building,
  Lock,
  Personalcard,
  Shop,
  Sms,
  User,
  UserSquare,
} from "iconsax-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { z } from "zod";
import { Input } from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nome é obrigatório")
      .min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    cpf: z
      .string()
      .min(1, "CPF é obrigatório")
      .refine((val) => cpfValidator.isValid(val), "CPF inválido"),
    empresa: z.string().min(1, "Nome da empresa é obrigatório"),
    branch_of_empresa: z.string().min(1, "Work_sector da empresa é obrigatório"),
    age: z.string().min(1, "Idade obrigatória"),
    gender: z.string().min(1, "Gênero obrigatório"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const { signUp } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      empresa: "",
      branch_of_empresa: "",
      age: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);

      const { error } = await signUp(
        data.email,
        data.password,
        data.name,
        data.cpf,
        data.empresa,
        data.branch_of_empresa,
        data.age,
        data.gender,
      );

      if (error) {
        toast.show(
          error.message || "Não foi possível criar sua conta. Tente novamente.",
          {
            type: "danger",
            placement: "bottom",
            duration: 3000,
            animationType: "slide-in",
          }
        );
        return;
      }
      toast.show(
        "Cadastro realizado com sucesso! Verifique seu email para confirmar.",
        {
          type: "success",
          placement: "bottom",
          duration: 3000,
          animationType: "slide-in",
        }
      );
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.show("Ocorreu um erro durante o cadastro. Tente novamente.", {
        type: "danger",
        placement: "bottom",
        duration: 3000,
        animationType: "slide-in",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ backgroundColor: colors.background }}
    >
      <StatusBar style="dark" />

      <View
        className="absolute top-0 right-0 w-40 h-40 rounded-full"
        style={{
          backgroundColor: colors.primary,
          opacity: 0.1,
          transform: [{ translateX: 50 }, { translateY: -50 }],
        }}
      />
      <View
        className="absolute bottom-0 right-0 w-60 h-60 rounded-full"
        style={{
          backgroundColor: colors.secondary,
          opacity: 0.1,
          transform: [{ translateX: 100 }, { translateY: 100 }],
        }}
      />
      <View
        className="absolute bottom-20 left-0 w-32 h-32 rounded-full"
        style={{
          backgroundColor: colors.primary,
          opacity: 0.4,
          transform: [{ translateX: -40 }],
        }}
      />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
          paddingVertical: 40,
        }}
      >
        <View className="items-center mt-32 mb-12">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Criar sua conta
          </Text>
          <Text className="text-base text-gray-600 text-center">
            Preencha seus dados para começar sua jornada para uma vida ativa e
            sem dores.
          </Text>
        </View>

        <View className="space-y-4">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                Icon={User}
                placeholder="Digite seu nome completo"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize="words"
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                Icon={Sms}
                placeholder="Digite seu e-mail"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                Icon={Personalcard}
                placeholder="Digite seu CPF"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="numeric"
                maxLength={14}
                mask={cpfMask}
                error={errors.cpf?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="empresa"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                Icon={Building}
                placeholder="Nome da empresa"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize="words"
                error={errors.empresa?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="branch_of_empresa"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                Icon={Shop}
                placeholder="Setor de atuação"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize="words"
                error={errors.branch_of_empresa?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="age"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                Icon={UserSquare}
                placeholder="Idade"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="numeric"
                error={errors.age?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                Icon={Personalcard}
                placeholder="Gênero"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.gender?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                Icon={Lock}
                placeholder="Crie uma senha"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                isPassword
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                Icon={Lock}
                placeholder="Confirme sua senha"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                isPassword
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            title="Criar conta"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            className="mt-8"
          />

          <View className="flex-row justify-center mt-8 mb-32">
            <Text className="text-gray-600">Já tem uma conta? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <Text
                  className="font-semibold"
                  style={{ color: colors.primary }}
                >
                  Entrar
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
