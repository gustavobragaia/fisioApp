import colors from "@/styles/colors";
import { ArrowRight2 } from "iconsax-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TriageOptionProps {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export function TriageOption({ title, icon, onPress }: TriageOptionProps) {
  return (
    <TouchableOpacity
      className="rounded-2xl mb-6 overflow-hidden bg-white p-4 flex-row items-center justify-between max-h-[145px]"
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View className="flex-1 h-full justify-between">
        <View>{icon}</View>
        <Text className="text-textPrimary font-medium text-xl w-4/6">
          {title}
        </Text>
      </View>

      <View className="bg-gray-100 rounded-full w-10 h-10 items-center justify-center">
        <ArrowRight2 size={26} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
}
