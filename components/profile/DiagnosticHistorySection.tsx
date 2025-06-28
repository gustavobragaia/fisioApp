import { DiagnosticItem } from "@/app/(tabs)/profile";
import { FlatList, View } from "react-native";
import { EmptyState } from "../EmptyState";
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
      <EmptyState title="Nenhuma diagnostico encontradoa" variant="sad" />
    )}
  </View>
);
