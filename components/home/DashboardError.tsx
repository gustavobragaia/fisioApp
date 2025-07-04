import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface DashboardErrorProps {
  onRetry: () => void;
}

export function DashboardError({ onRetry }: DashboardErrorProps) {
  return (
    <View className="flex-1 justify-center items-center px-6 bg-background">
      <Text className="text-textPrimary text-lg font-semibold mb-4 text-center">
        Ops! Algo deu errado
      </Text>
      <Text className="text-textSecondary text-base mb-6 text-center">
        Não conseguimos carregar os dados. Tente novamente.
      </Text>
      <TouchableOpacity
        onPress={onRetry}
        className="bg-primary px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">Tentar Novamente</Text>
      </TouchableOpacity>
    </View>
  );
};
