import colors from "@/styles/colors";
import { TriagemItem } from "@/types/dashboard";
import { useRouter } from "expo-router";
import { ArrowRight2 } from "iconsax-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export const TriagemHistoryCard = ({ item }: { item: TriagemItem }) => {
    const router = useRouter();

  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 mb-3 shadow-sm flex-row justify-between items-center"
      onPress={() => {
        console.log("Navigating to triagem with ID:", item.id);
        const params = {
          id: item.id,
          type: item.type === "Dor" ? "pain" : "mental",
        };
        const queryString = `?id=${encodeURIComponent(item.id)}&type=${encodeURIComponent(params.type)}`;
        router.push(`/(tabs)/(triagem)/diagnostic-ideal${queryString}`);
      }}
      activeOpacity={0.7}
    >
      <View>
        <Text className="font-semibold text-lg text-gray-800 mb-1 capitalize">
          Triagem - {item.location}
        </Text>
        <Text className="text-gray-500 text-sm">
          {new Date(item.date).toLocaleDateString("pt-BR")}
        </Text>
      </View>

      <View className="flex-row items-center">
        <Text className="font-medium text-primary text-lg mr-3">
          {item.progress.completed}/{item.progress.total}
        </Text>
        <View className="bg-gray-100 rounded-full w-8 h-8 items-center justify-center">
          <ArrowRight2
            size={16}
            color={colors.primary}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
