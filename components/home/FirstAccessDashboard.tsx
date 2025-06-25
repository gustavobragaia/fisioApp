import colors from "@/styles/colors";
import { useRouter } from "expo-router";
import { Laugh } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export const FirstAccessDashboard = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <Text className="font-semibold text-textPrimary text-xl mb-4 mt-6">
        Meu Diário Emocional
      </Text>
      <View className="bg-white border border-[#DFDFF1] border-dashed rounded-2xl p-6 shadow-md w-full items-center">
        <View className="bg-[#F3FEF3] rounded-full px-3 py-2 flex-row items-center justify-center gap-3">
          <Laugh size={24} color={colors.primary} />
          <Laugh size={24} color={colors.primary} />
          <Laugh size={24} color={colors.primary} />
        </View>
        <Text className="text-base font-medium text-center my-3 text-textPrimary/50">
          Você ainda não registrou duas emoções
        </Text>
        <TouchableOpacity
          className="w-full"
          onPress={() => router.push("/(tabs)/(triagem)/triagem")}
        >
          <Text className="text-primary font-semibold text-center text-lg">
            Começar Triagem
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
