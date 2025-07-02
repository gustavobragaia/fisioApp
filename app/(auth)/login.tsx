import { Button } from "@/components/Button";
import colors from "@/styles/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Lock, Sms } from "iconsax-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { z } from "zod";
import { Input } from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      const { session, error } = await signIn(data.email, data.password);

      if (error) {
        toast.show(error.message || "Falha na autenticação. Verifique seu email e senha.", {
          type: "danger",
          placement: "bottom",
          duration: 3000,
          animationType: "slide-in",
        });
        return;
      }

      // If we have a valid session, navigation will be handled by AuthContext's auth state change listener
      if (session) {
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.show("Ocorreu um erro ao fazer login. Tente novamente.", {
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
        <View className="items-center mb-12">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Seja bem-vindo(a) de volta
          </Text>
          <Text className="text-base text-gray-600 text-center">
            Acesse sua jornada para uma vida ativa e sem dores.
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

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                Icon={Lock}
                placeholder="Digite sua senha"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                isPassword
                error={errors.password?.message}
              />
            )}
          />

          <TouchableOpacity
            className="self-end mt-2"
            onPress={() => router.navigate('/(auth)/forgot-password')}
          >
            <Text
              className="text-sm font-medium"
              style={{ color: colors.primary }}
            >
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>

          <Button
            title="Entrar"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            className="mt-8"
          />

          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-600">Não tem uma conta? </Text>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text
                  className="font-semibold"
                  style={{ color: colors.primary }}
                >
                  Cadastre-se
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
