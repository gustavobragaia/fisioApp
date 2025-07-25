import colors from "@/styles/colors";
import { useRouter } from "expo-router";
import { ArrowLeft2 } from "iconsax-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type BackHeaderProps = {
  title: string;
  subtitle?: string;
  totalExercises?: number;
  currentIndex?: number;
  onBackPress?: () => void;
};

export default function BackHeader({
  title,
  subtitle,
  onBackPress,
}: BackHeaderProps) {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View className="items-start mb-6">
      <TouchableOpacity
        className="w-10 h-10 rounded-full bg-white shadow-[0_3px_30px_rgba(16,16,16,0.03)] items-center justify-center"
        onPress={handleBackPress}
      >
        <ArrowLeft2 size={32} color={colors.primary} />
      </TouchableOpacity>

      <View className="mt-6">
        <Text className="text-4xl font-bold text-textPrimary">{title}</Text>
        {subtitle && <Text className="text-sm text-secondary">{subtitle}</Text>}
      </View>
    </View>
  );
}
