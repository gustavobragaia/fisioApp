import { Button } from "@/components/Button";
import colors from "@/styles/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft2, Sms, TickCircle } from "iconsax-react-native";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";
import { Input } from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const { resetPassword } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleResetPassword = async (email: string) => {
    if (!email) {
      Alert.alert("Erro", "Por favor, informe seu email");
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await resetPassword(email);

      if (error) {
        Alert.alert(
          "Erro",
          error.message || "Não foi possível enviar o email de recuperação"
        );
        return;
      }

      setEmailSent(true);
    } catch (error) {
      console.error("Reset password error:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar redefinir sua senha");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await handleResetPassword(data.email);
  };

  const handleBackToLogin = () => {
    router.back();
  };

  const handleResendEmail = async () => {
    const email = getValues("email");
    await handleResetPassword(email);
  };

  if (emailSent) {
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

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 24,
            paddingVertical: 40,
          }}
        >
          <View className="items-center mb-12">
            <View
              className="w-20 h-20 rounded-full items-center justify-center mb-6"
              style={{ backgroundColor: colors.primary + "20" }}
            >
              <TickCircle size={40} color={colors.primary} />
            </View>

            <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Email enviado!
            </Text>
            <Text className="text-base text-gray-600 text-center mb-4">
              Enviamos um link de recuperação para
            </Text>
            <Text
              className="text-base font-semibold text-center mb-6"
              style={{ color: colors.primary }}
            >
              {getValues("email")}
            </Text>
            <Text className="text-sm text-gray-500 text-center">
              Verifique sua caixa de entrada e spam. O link expira em 1 hora.
            </Text>
          </View>

          <View className="space-y-4">
            <Button
              title="Voltar ao login"
              onPress={handleBackToLogin}
              className="mb-4"
            />

            <TouchableOpacity
              className="items-center py-3"
              onPress={handleResendEmail}
              disabled={isLoading}
            >
              <Text className="text-sm text-gray-600">
                Não recebeu o email?{" "}
                <Text
                  className="font-semibold"
                  style={{ color: colors.primary }}
                >
                  Reenviar
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={"padding"}
      style={{ backgroundColor: colors.background }}
    >
      <StatusBar style="dark" />

      <View className="mt-12 flex-row items-center px-6 pt-12 pb-4">
        <TouchableOpacity
          onPress={handleBackToLogin}
          className="w-16 h-16 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.primary + "20" }}
        >
          <ArrowLeft2 size={32} color={colors.primary} />
        </TouchableOpacity>
      </View>

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
        <View className="items-center mb-12">
          <View
            className="w-20 h-20 rounded-full items-center justify-center mb-6"
            style={{ backgroundColor: colors.primary + "20" }}
          >
            <Sms size={40} color={colors.primary} />
          </View>

          <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Esqueceu sua senha?
          </Text>
          <Text className="text-base text-gray-600 text-center">
            Não se preocupe! Digite seu email e enviaremos um link para
            redefinir sua senha.
          </Text>
        </View>

        <View className="space-y-4">
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

          <Button
            title="Enviar link de recuperação"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            className="mt-8"
          />

          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-600">Lembrou da senha? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
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
