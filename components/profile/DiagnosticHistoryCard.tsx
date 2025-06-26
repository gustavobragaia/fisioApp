import { DiagnosticItem } from "@/app/(tabs)/profile";
import colors from "@/styles/colors";
import { useRouter } from "expo-router";
import { ArrowRight2 } from "iconsax-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export const DiagnosticHistoryCard = ({ item }: { item: DiagnosticItem }) => {
  const router = useRouter();

  const getPainLevelColor = (level: number | undefined) => {
    if (level === undefined) return "text-gray-600";

    if (level >= 6) {
      return "text-red-500 font-semibold";
    } else if (level >= 3) {
      return "text-orange-400 font-semibold";
    } else {
      return "text-green-600 font-semibold";
    }
  };

  const getPainLevelLabel = (level: number | undefined) => {
    if (level === undefined) return "Indefinido";

    if (level >= 6) {
      return "Alta";
    } else if (level >= 3) {
      return "Média";
    } else {
      return "Baixa";
    }
  };

  const getStatusBadgeBackground = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "concluído":
        return "bg-[#E1FFDE]";
      case "em andamento":
        return "bg-[#DEF6FF]";
      case "pendente":
        return "bg-[#FFF4DE]";
      case "cancelado":
        return "bg-[#FFE1DE]";
      default:
        return "bg-gray-100";
    }
  };

  const getStatusBadgeTextColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "concluído":
        return "text-[#238E17]";
      case "em andamento":
        return "text-[#175C8E]";
      case "pendente":
        return "text-[#8E6A17]";
      case "cancelado":
        return "text-[#8E1717]";
      default:
        return "text-gray-700";
    }
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 mb-3 shadow-sm flex-row justify-between items-center"
      onPress={() => {
        router.push({
          pathname: "/(tabs)/(triagem)/diagnostic-ideal",
          params: { id: item.id, fromHistory: "true" },
        });
      }}
      activeOpacity={0.7}
    >
      <View className="flex-1">
        <Text className="font-semibold text-lg text- mb-1">{item.title}</Text>

        <Text className="text-gray-500 text-sm">
          Nível de dor:{" "}
          <Text className={getPainLevelColor(item.painLevel)}>
            {getPainLevelLabel(item.painLevel)}
          </Text>
        </Text>
      </View>

      <View className="flex-row items-center">
        <View
          className={`px-3 py-2 rounded-full mr-3 ${getStatusBadgeBackground(
            item.status
          )}`}
        >
          <Text className={`text-sm font-medium ${getStatusBadgeTextColor(
            item.status
          )}`}>{item.status}</Text>
        </View>

        <View className="bg-gray-100 rounded-full w-8 h-8 items-center justify-center">
          <ArrowRight2 size={16} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
