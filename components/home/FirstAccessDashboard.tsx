import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { EmptyState } from "../EmptyState";

export const FirstAccessDashboard = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <Text className="font-semibold text-textPrimary text-xl mb-4 mt-6">
        Meu Diário Emocional
      </Text>
      <EmptyState
        variant="emotions"
        title="Você ainda não registrou duas emoções"
        buttonText="Fazer Check-in agora"
        onPress={() => router.push("/(tabs)/(triagem)/triagem")}
      />
    </View>
  );
};
