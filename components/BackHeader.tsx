import colors from "@/styles/colors";
import { useRouter } from "expo-router";
import { ArrowLeft2 } from "iconsax-react-native";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

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
  totalExercises,
  currentIndex,
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

  const renderDotsIndicator = () => {
    const screenWidth = Dimensions.get("window").width;
    const containerPadding = 32;
    const availableWidth = screenWidth - containerPadding;

    const dotWidth = availableWidth / totalExercises!;

    return (
      <View
        className="flex-row mt-8"
        style={{
          width: availableWidth,
          alignSelf: "center",
        }}
      >
        {Array.from({ length: totalExercises! }, (_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full ${
              index === currentIndex ? "bg-primary" : "bg-gray-200"
            }`}
            style={{
              width: dotWidth,
              flex: 1, // Garante que cada dot ocupe espaço igual
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <View className="items-start mb-6">
      <TouchableOpacity
        className="w-10 h-10 rounded-full bg-white shadow-[0_3px_30px_rgba(16,16,16,0.03)] items-center justify-center"
        onPress={handleBackPress}
      >
        <ArrowLeft2 size={24} color={colors.primary} />
      </TouchableOpacity>

      {totalExercises && renderDotsIndicator()}

      <View className="mt-6">
        <Text className="text-4xl font-bold text-textPrimary">{title}</Text>
        {subtitle && <Text className="text-sm text-secondary">{subtitle}</Text>}
      </View>
    </View>
  );
}
