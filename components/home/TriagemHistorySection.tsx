import { TriagemItem } from "@/app/(tabs)";
import colors from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { CircleOff, Frown, HeartCrack } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export const TriagemHistorySection = ({ triagemHistory }: { triagemHistory: TriagemItem[] }) => (
  <View className="flex-1 my-6">
    <Text className="font-semibold text-textPrimary text-xl mb-4">
      Histórico de Triagens
    </Text>
    
    {triagemHistory.length > 0 ? (
      <FlatList
        data={triagemHistory}
        renderItem={({ item }) => <TriagemHistoryCard item={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        nestedScrollEnabled={true}
      />
    ) : (
      <EmptyTriagemState />
    )}
  </View>
);

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
        <Text className="font-semibold text-lg text-gray-800 mb-1">
          Triagem - {item.location}
        </Text>
        <Text className="text-gray-500 text-sm">
          {new Date(item.date).toLocaleDateString("pt-BR")}
        </Text>
      </View>

      <View className="flex-row items-center">
        <Text className="font-medium text-green-500 text-lg mr-3">
          {item.progress.completed}/{item.progress.total}
        </Text>
        <View className="bg-gray-100 rounded-full w-8 h-8 items-center justify-center">
          <Ionicons
            name="chevron-forward"
            size={16}
            color="#6B7280"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const EmptyTriagemState = () => {
  const router = useRouter();

  return (
    <View className="bg-white border border-[#DFDFF1] rounded-2xl p-6 shadow-md w-full items-center">
      <View className="bg-[#F3FEF3] rounded-full px-3 py-2 flex-row items-center justify-center gap-3">
        <Frown size={24} color={colors.primary} />
        <HeartCrack size={24} color={colors.primary} />
        <CircleOff size={24} color={colors.primary} />
      </View>
      <Text className="text-base font-medium text-center my-3 text-textPrimary/50">
        Nenhuma triagem encontrada
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
  );
};