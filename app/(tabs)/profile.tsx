import { Loading } from '@/components/Loading';
import { HistoryTab } from '@/components/profile/HistoryTab';
import { ProfileError } from '@/components/profile/ProfileError';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { SettingsTab } from '@/components/profile/SettingsTab';
import { useProfileData } from '@/hooks/useProfileData';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'history' | 'settings'>('history');

  const {
    data,
    isLoading,
    isError,
    refetch
  } = useProfileData();

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
          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === 'history' ? (
            <HistoryTab
              diagnosticHistory={diagnosticHistory}
              isLoading={false}
            />
          ) : (
            <SettingsTab
              userProfile={userProfile}
              isLoading={false}
            />
          )}
        </View>

        {activeTab === "settings" && <View className="h-20" />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
