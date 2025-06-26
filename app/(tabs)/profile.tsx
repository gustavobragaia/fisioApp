/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from "@/components/Header";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building,
  Factory,
  IdCard,
  LogOut,
  Mail,
  User,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";
import { useAuth } from "../../contexts/AuthContext";
// import { getUserTriagens } from "../../lib/supabaseUtils";
import { Input } from "@/components/Input";
import { DiagnosticHistorySection } from "@/components/profile/DiagnosticHistorySection";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../styles/colors";
import { User as UserType } from "../../types/supabase";

export interface DiagnosticItem {
  id: string;
  date: string;
  title: string;
  painLevel?: number;
  status: string;
}

const mockDiagnosticHistory: DiagnosticItem[] = [
  {
    id: "1",
    date: "15/06/2025",
    title: "Dor nas Costas",
    painLevel: 7,
    status: "Concluído",
  },
  {
    id: "2",
    date: "10/06/2025",
    title: "Dor de Cabeça",
    painLevel: 5,
    status: "Concluído",
  },
  {
    id: "3",
    date: "05/06/2025",
    title: "Dor no Joelho",
    painLevel: 6,
    status: "Em andamento",
  },
  {
    id: "4",
    date: "28/05/2025",
    title: "Saúde Mental",
    status: "Concluído",
  },
  {
    id: "5",
    date: "20/05/2025",
    title: "Dor no Pescoço",
    painLevel: 4,
    status: "Concluído",
  },
  {
    id: "6",
    date: "15/05/2025",
    title: "Dor Abdominal",
    painLevel: 8,
    status: "Concluído",
  },
];

const editProfileSchema = z.object({
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
  setor: z
    .string()
    .max(50, "Setor deve ter no máximo 50 caracteres")
    .optional()
    .or(z.literal("")),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

// Função para formatar CPF
const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export default function ProfileScreen() {
  const { signOut, user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserType | null>(null);
  const [diagnosticHistory, setDiagnosticHistory] = useState<DiagnosticItem[]>(
    mockDiagnosticHistory
  );
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("history");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setValue,
    watch,
    reset,
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      empresa: "",
      setor: "",
    },
  });

  const cpfValue = watch("cpf");

  useEffect(() => {
    if (user) {
      setUserProfile(user);
      reset({
        name: user.name || "",
        email: user.email || "",
        cpf: user.cpf || "",
        empresa: user.empresa || "",
        // setor: !user?.setor || ""
      });
    }
  }, [user, reset]);

  useEffect(() => {
    if (cpfValue) {
      const maskedCpf = cpfMask(cpfValue);
      if (maskedCpf !== cpfValue) {
        setValue("cpf", maskedCpf);
      }
    }
  }, [cpfValue, setValue]);

  const onSubmitProfile = async (data: EditProfileFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // const { error } = await updateUserProfile(userProfile?.id, data);
      // if (error) throw error;

      setUserProfile((prev) => (prev ? { ...prev, ...data } : null));

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!", [
        { text: "OK" },
      ]);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao atualizar o perfil. Tente novamente.",
        [{ text: "OK" }]
      );
    }
  };

  const renderHistoryTab = () => {
    if (isLoading) {
      return (
        <View className="flex-1 items-center justify-center py-6">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    if (diagnosticHistory.length === 0) {
      return (
        <View className="flex-1 items-center justify-center py-10">
          <Text className="text-textPrimary text-lg">
            Nenhum diagnóstico encontrado
          </Text>
        </View>
      );
    }

    return (
      <View className="flex-1 mt-6">
        <DiagnosticHistorySection diagnosticHistory={diagnosticHistory} />
      </View>
    );
  };

  const renderSettingsTab = () => {
    if (isLoading) {
      return (
        <View className="flex-1 items-center justify-center py-6">
          <ActivityIndicator size="large" color={colors.light.deepBlue} />
        </View>
      );
    }

    return (
      <View className="flex-1 mt-6">
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
                Icon={Mail}
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
                Icon={IdCard}
                placeholder="Digite seu CPF"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="numeric"
                maxLength={14}
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
            name="setor"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                Icon={Factory}
                placeholder="Setor"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize="words"
                error={errors.setor?.message}
              />
            )}
          />
        </View>

        {/* <Button
          title="Salvar Alterações"
          loading={isSubmitting}
          onPress={handleSubmit(onSubmitProfile)}
        /> */}

        <TouchableOpacity
          className="flex-row items-center justify-between p-4 bg-white rounded-lg mb-3 shadow-sm h-14"
          activeOpacity={0.7}
          onPress={() => {
            console.log("Navegar para Sobre o App");
          }}
        >
          <Text className="text-textPrimary text-base font-medium flex-1">
            Sobre o App
          </Text>
          <View className="bg-gray-100 rounded-full w-8 h-8 items-center justify-center">
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4 bg-white rounded-lg mb-3 shadow-sm"
          onPress={signOut}
          activeOpacity={0.7}
        >
          <Text className="text-textPrimary text-base font-medium flex-1">
            Sair
          </Text>
          <View className="bg-gray-100 rounded-full w-8 h-8 items-center justify-center">
            <LogOut size={16} color={colors.primary} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        className="flex-1 bg-background"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Header name={userProfile?.name || "Usuário"} />

        <View className="flex-1 px-6">
          <View className="flex-row justify-center gap-2 mt-6">
            <TouchableOpacity
              className={`py-3 px-6 items-center border-b-2 ${
                activeTab === "history"
                  ? "border-primary"
                  : "border-transparent"
              }`}
              onPress={() => setActiveTab("history")}
              activeOpacity={0.8}
            >
              <Text
                className={`font-medium ${
                  activeTab === "history" ? "text-primary" : "text-secondary"
                }`}
              >
                Histórico
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`py-3 px-6 items-center border-b-2 ${
                activeTab === "settings"
                  ? "border-primary"
                  : "border-transparent"
              }`}
              onPress={() => setActiveTab("settings")}
              activeOpacity={0.8}
            >
              <Text
                className={`font-medium ${
                  activeTab === "settings" ? "text-primary" : "text-secondary"
                }`}
              >
                Configurações
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === "history" ? renderHistoryTab() : renderSettingsTab()}
        </View>

        {activeTab === "settings" && <View className="h-20" />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
