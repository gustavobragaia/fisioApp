import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ProfileTabsProps {
  activeTab: 'history' | 'settings';
  onTabChange: (tab: 'history' | 'settings') => void;
}

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <View className="flex-row justify-center gap-2 mt-6">
      <TouchableOpacity
        className={`py-3 px-6 items-center border-b-2 ${
          activeTab === "history"
            ? "border-primary"
            : "border-transparent"
        }`}
        onPress={() => onTabChange("history")}
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
        onPress={() => onTabChange("settings")}
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
  );
};
