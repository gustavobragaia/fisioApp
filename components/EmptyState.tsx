import { useRouter } from "expo-router";
import {
  CloseCircle,
  EmojiHappy,
  EmojiNormal,
  EmojiSad,
  Health,
  HeartRemove,
  HeartSearch,
  Lovely,
} from "iconsax-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import colors from "@/styles/colors";

type EmptyStateVariant = "emotions" | "sad" | "diagnostico";

interface EmptyStateProps {
  variant: EmptyStateVariant;
  title?: string;
  buttonText?: string;
  onPress?: () => void;
}

export function EmptyState({
  variant,
  title,
  buttonText,
  onPress,
}: EmptyStateProps) {
  const router = useRouter();

  const getIcons = () => {
    switch (variant) {
      case "emotions":
        return [
          <EmojiHappy key="happy" size={24} color={colors.primary} />,
          <EmojiNormal key="normal" size={24} color={colors.primary} />,
          <EmojiSad key="sad" size={24} color={colors.primary} />,
        ];
      case "sad":
        return [
          <EmojiSad key="sad" size={24} color={colors.primary} />,
          <HeartRemove key="heart" size={24} color={colors.primary} />,
          <CloseCircle key="close" size={24} color={colors.primary} />,
        ];
      case "diagnostico":
        return [
          <Health key="health" size={24} color={colors.primary} />,
          <HeartSearch key="heart-search" size={24} color={colors.primary} />,
          <Lovely key="lovely" size={24} color={colors.primary} />,
        ];
      default:
        return [];
    }
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push("/(tabs)/(triagem)/triagem");
    }
  };

  return (
    <View className="bg-white border border-[#DFDFF1] border-dashed rounded-2xl p-6 shadow-[0_3px_30px_rgba(16,16,16,0.03)]  w-full items-center">
      <View className="bg-[#F3FEF3] rounded-full px-3 py-2 flex-row items-center justify-center gap-3">
        {getIcons()}
      </View>

      <Text className="text-base font-medium text-center my-3 text-textPrimary/50">
        {title}
      </Text>

      {buttonText && (
        <TouchableOpacity className="w-full" onPress={handlePress}>
          <Text className="text-primary font-semibold text-center text-lg">
            {buttonText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
