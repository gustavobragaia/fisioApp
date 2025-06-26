
import { DiagnosticItem } from "@/app/(tabs)/profile";
import colors from "@/styles/colors";
import { CircleOff, Frown, HeartCrack } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";
import { DiagnosticHistoryCard } from "./DiagnosticHistoryCard";

export const DiagnosticHistorySection = ({
  diagnosticHistory,
}: {
  diagnosticHistory: DiagnosticItem[];
}) => (
  <View>
    {diagnosticHistory.length > 0 ? (
      <FlatList
        data={diagnosticHistory} 
        renderItem={({ item }) => <DiagnosticHistoryCard item={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        nestedScrollEnabled={true}
      />
    ) : (
      <EmptyDiagnosticState />
    )}
  </View>
);

const EmptyDiagnosticState = () => {
  return (
    <View className="bg-white border border-[#DFDFF1] rounded-2xl p-6 shadow-md w-full items-center">
      <View className="bg-[#F3FEF3] rounded-full px-3 py-2 flex-row items-center justify-center gap-3">
        <Frown size={24} color={colors.primary} />
        <HeartCrack size={24} color={colors.primary} />
        <CircleOff size={24} color={colors.primary} />
      </View>
      <Text className="text-base font-medium text-center my-3 text-textPrimary/50">
        Nenhuma diagnostico encontrado
      </Text>
    </View>
  );
};
