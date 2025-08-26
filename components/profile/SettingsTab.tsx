import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useUpdateUserAuth } from "@/hooks/useUpdateUserAuthData";
import colors from "@/styles/colors";
import type { User } from "@/types/supabase";
import { UserUpdateData } from "@/lib/userUtils";
import { dateMask, parseDateFromString } from "@/utils/dateMask";
import { genderOptions } from "@/utils/genderOptions";
import { cpfMask, hasFormChanges } from "@/utils/profileUtils";
import { formatDate } from "@/lib/userUtils";
import {
  EditProfileFormData,
  editProfileSchema,
} from "@/validation/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building,
  Cake,
  Lock,
  LogoutCurve,
  Personalcard,
  Shop,
  Sms,
  User as UserIcon,
} from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { Loading } from "../Loading";

interface SettingsTabProps {
  userProfile: User | null;
  isLoading: boolean;
}

export function SettingsTab({ userProfile, isLoading }: SettingsTabProps) {
  const { signOut } = useAuth() as {
    signOut: () => void;
  };
  const updateProfileMutation = useUpdateProfile();
  const updateUserAuthMutation = useUpdateUserAuth();
  const toast = useToast();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isFirstAccess = !!userProfile?.is_first_access;

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

  const onSubmitProfile = async (formData: EditProfileFormData) => {
    try {
      const updates: Partial<UserUpdateData> = {};
      
      // Check each field for changes
      const fieldsToCheck: (keyof EditProfileFormData)[] = [
        'name', 'email', 'cpf', 'empresa', 'branch_of_empresa', 'age', 'gender'
      ];

      fieldsToCheck.forEach(field => {
        if (formData[field] !== originalData[field]) {
          if (field === 'age') {
            const birthDate = parseDateFromString(formData.age);
            if (birthDate) {
              updates.age = formatDate(birthDate.toISOString());
            }
          } else {
            // Map form fields to update fields
            const updateField = field === 'branch_of_empresa' ? 'branch_of_empresa' : field;
            updates[updateField as keyof UserUpdateData] = formData[field] as any;
          }
        }
      });

      if (Object.keys(updates).length === 0) {
        toast.show("Nenhuma alteração para salvar", {
          type: "info",
          placement: "bottom",
          duration: 3000,
        });
        return;
      }

      await updateProfileMutation.mutateAsync(updates);
    } catch (error) {
      console.error("Error in onSubmitProfile:", error);
      // Error is already handled by the mutation's onError
    }
  };

  const handlePasswordUpdate = async () => {
    if (!newPassword || !confirmPassword) {
      toast.show("Preencha todos os campos de senha", {
        type: "danger",
        placement: "bottom",
        duration: 3000,
      });
      return;
    }

    if (newPassword.length < 6) {
      toast.show("A senha deve ter pelo menos 6 caracteres", {
        type: "danger",
        placement: "bottom",
        duration: 3000,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.show("As senhas não coincidem", {
        type: "danger",
        placement: "bottom",
        duration: 3000,
      });
      return;
    }

    try {
      const user = await updateUserAuthMutation.mutate({
        email: userProfile?.email,
        password: newPassword,
      });
      console.log("User updated:", user);

      await updateProfileMutation.mutateAsync({
        is_first_access: false,
      } as any);

      toast.show("Senha atualizada com sucesso!", {
        type: "success",
        placement: "bottom",
        duration: 3000,
      });

      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.show("Erro ao atualizar senha", {
        type: "danger",
        placement: "bottom",
        duration: 3000,
      });
    }
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
              Icon={UserIcon}
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
              editable={false}
              selectTextOnFocus={false}
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
          render={({ field: { onChange, value } }) => (
            <>
              <View className="flex-row gap-4 items-center justify-center mb-4">
                {genderOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    className={`flex-1 px-4 py-2 rounded flex items-center justify-center ${
                      value === option.value ? "bg-primary" : "bg-slate-200"
                    }`}
                    onPress={() => onChange(option.value)}
                    activeOpacity={0.8}
                  >
                    <Text
                      className={
                        value === option.value ? "text-white" : "text-gray-700"
                      }
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.gender && (
                <Text className="text-error text-xs mt-1">
                  {errors.gender?.message}
                </Text>
              )}
            </>
          )}
        />

        {isFirstAccess && (
          <>
            <Input
              Icon={Lock}
              placeholder="Nova senha"
              value={newPassword}
              onChangeText={setNewPassword}
              isPassword
            />
            <Input
              Icon={Lock}
              placeholder="Confirmar nova senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPassword
            />
          </>
        )}
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

      {isFirstAccess && (newPassword || confirmPassword) && (
        <View className="mb-6">
          <Button
            title="Atualizar Senha"
            loading={updateUserAuthMutation.isPending}
            onPress={handlePasswordUpdate}
          />
        </View>
      )}

      <View className="gap-3">
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
