import colors from "@/styles/colors";
import { ActivityIndicator, Text, View } from "react-native";

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color={colors.primary} />
      <Text className="text-lg text-primary font-medium">Carregando...</Text>
    </View>
  );
}
