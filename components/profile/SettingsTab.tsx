import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import colors from "@/styles/colors";
import { User as UserType } from "@/types/supabase";
import { dateMask, parseDateFromString } from "@/utils/dateMask";
import { cpfMask, hasFormChanges } from "@/utils/profileUtils";
import {
  EditProfileFormData,
  editProfileSchema,
} from "@/validation/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight2,
  Building,
  Cake,
  LogoutCurve,
  Personalcard,
  Shop,
  Sms,
  User,
} from "iconsax-react-native";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { Loading } from "../Loading";

interface SettingsTabProps {
  userProfile: UserType | null;
  isLoading: boolean;
}

export function SettingsTab({ userProfile, isLoading }: SettingsTabProps) {
  const { signOut } = useAuth();
  const updateProfileMutation = useUpdateProfile();

  const {
    control,
    handleSubmit,
    formState: { errors },
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
      branch_of_empresa: "",
      age: "",
      gender: "",
    },
  });

  const cpfValue = watch("cpf");
  const formValues = watch();

  const originalData: EditProfileFormData = {
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    cpf: userProfile?.cpf || "",
    empresa: userProfile?.empresa || "",
    branch_of_empresa: userProfile?.branch_of_empresa || "",
    age: userProfile?.age || "",
    gender: userProfile?.gender || "",
  };

  const hasChanges = hasFormChanges(formValues as any, originalData as any);

  useEffect(() => {
    if (userProfile) {
      reset(originalData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, reset]);

  useEffect(() => {
    if (cpfValue) {
      const maskedCpf = cpfMask(cpfValue);
      if (maskedCpf !== cpfValue) {
        setValue("cpf", maskedCpf);
      }
    }
  }, [cpfValue, setValue]);

  const onSubmitProfile = async (data: EditProfileFormData) => {
    const birthDate = parseDateFromString(data.age);

    const changedData: Partial<EditProfileFormData> = {};

    Object.keys(data).forEach((key) => {
      const fieldKey = key as keyof EditProfileFormData;

      if (fieldKey === "age") {
        if (birthDate && birthDate.toISOString() !== originalData.age) {
          changedData.age = birthDate.toISOString();
        }
      } else {
        if (data[fieldKey] !== originalData[fieldKey]) {
          changedData[fieldKey] = data[fieldKey];
        }
      }
    });

    if (Object.keys(changedData).length === 0) {
      return;
    }

    updateProfileMutation.mutate(changedData);
  };

  if (isLoading) {
    return <Loading />;
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
              Icon={Cake}
              placeholder="Data de nascimento"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              keyboardType="numeric"
              mask={dateMask}
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
      </View>

      {hasChanges && (
        <View className="mb-6">
          <Button
            title="Salvar Alterações"
            loading={updateProfileMutation.isPending}
            onPress={handleSubmit(onSubmitProfile)}
          />
        </View>
      )}

      <View className="gap-3">
        <TouchableOpacity
          className="flex-row items-center justify-between p-4 bg-white rounded-lg shadow-sm h-14"
          activeOpacity={0.7}
          onPress={() => {
            console.log("Navegar para Sobre o App");
          }}
        >
          <Text className="text-textPrimary text-base font-medium flex-1">
            Sobre o App
          </Text>
          <View className="bg-gray-100 rounded-full w-8 h-8 items-center justify-center">
            <ArrowRight2 size={16} color={colors.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4 bg-white rounded-lg shadow-sm h-14"
          onPress={signOut}
          activeOpacity={0.7}
        >
          <Text className="text-textPrimary text-base font-medium flex-1">
            Sair
          </Text>
          <View className="bg-gray-100 rounded-full w-8 h-8 items-center justify-center">
            <LogoutCurve size={16} color={colors.primary} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
