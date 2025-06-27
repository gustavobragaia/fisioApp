import { TriagemItem } from "@/app/(tabs)";
import colors from "@/styles/colors";
import { useRouter } from "expo-router";
import { CloseCircle, EmojiSad, HeartRemove } from "iconsax-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { TriagemHistoryCard } from "./TriagemHistoryCard";

export const TriagemHistorySection = ({
  triagemHistory,
}: {
  triagemHistory: TriagemItem[];
}) => (
  <View>
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

const EmptyTriagemState = () => {
  const router = useRouter();

  return (
    <View className="bg-white border border-[#DFDFF1] rounded-2xl p-6 shadow-md w-full items-center">
      <View className="bg-[#F3FEF3] rounded-full px-3 py-2 flex-row items-center justify-center gap-3">
        <EmojiSad size={24} color={colors.primary} />
        <HeartRemove size={24} color={colors.primary} />
        <CloseCircle size={24} color={colors.primary} />
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
