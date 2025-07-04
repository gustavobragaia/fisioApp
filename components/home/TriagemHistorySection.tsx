import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { EmptyState } from "../EmptyState";
import { TriagemHistoryCard } from "./TriagemHistoryCard";
import { TriagemItem } from "@/types/dashboard";

export const TriagemHistorySection = ({
  triagemHistory,
}: {
  triagemHistory: TriagemItem[];
}) => {
  const router = useRouter();

  return (
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
        <EmptyState
          title="Nenhuma triagem encontrada"
          onPress={() => router.push("/(tabs)/(triagem)/triagem")}
          buttonText="Começar Triagem"
          variant="sad"
        />
      )}
    </View>
  );
};
