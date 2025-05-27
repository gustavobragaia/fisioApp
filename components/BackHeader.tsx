import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

type BackHeaderProps = {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
};

export default function BackHeader({ title, subtitle, onBackPress }: BackHeaderProps) {
  const router = useRouter();
  
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-row items-center mb-6">
      <TouchableOpacity 
        className="mr-4" 
        onPress={handleBackPress}
      >
        <Text className="text-deepBlue text-2xl">←</Text>
      </TouchableOpacity>
      <View>
        {subtitle && <Text className="text-sm text-textPrimary">{subtitle}</Text>}
        <Text className="text-2xl font-bold text-deepBlue">{title}</Text>
      </View>
    </View>
  );
}
