import { Loading } from "@/components/Loading";
import { HistoryTab } from "@/components/profile/HistoryTab";
import { ProfileError } from "@/components/profile/ProfileError";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { SettingsTab } from "@/components/profile/SettingsTab";
import { useProfileData } from "@/hooks/useProfileData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Toast } from "react-native-toast-notifications";

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<"history" | "settings">("history");

  const { data, isLoading, isError, refetch } = useProfileData();

  useEffect(() => {
    const maybeShowFirstAccessToast = async () => {
      try {
        const isFirstAccess = !!data?.userProfile?.is_first_access;
        if (!isFirstAccess) return;

        setActiveTab("settings");
        const key = `profile:firstAccessToastShown:${
          data?.userProfile?.id || "anon"
        }`;
        const alreadyShown = await AsyncStorage.getItem(key);
        if (alreadyShown) return;

        Toast.show(
          "Bem-vindo! Como é seu primeiro acesso, você pode atualizar sua senha nas configurações.",
          {
            type: "success",
            placement: "bottom",
            duration: 3500,
            animationType: "slide-in",
          }
        );

        await AsyncStorage.setItem(key, "true");
      } catch {
        // silencioso
      }
    };

    if (data?.userProfile) {
      maybeShowFirstAccessToast();
    }
  }, [data?.userProfile, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <ProfileError onRetry={refetch} />;
  }

  const { userProfile, diagnosticHistory } = data;

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
        <ProfileHeader name={userProfile?.name || "Usuário"} />

        <View className="flex-1 px-6">
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "history" ? (
            <HistoryTab
              diagnosticHistory={diagnosticHistory}
              isLoading={false}
            />
          ) : (
            <SettingsTab userProfile={userProfile} isLoading={false} />
          )}
        </View>

        {activeTab === "settings" && <View className="h-20" />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
