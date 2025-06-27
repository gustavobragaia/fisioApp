import { TriagemItem } from "@/app/(tabs)";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "../Button";

export const CurrentProgressCard = ({ triagem }: { triagem: TriagemItem }) => {
  const router = useRouter();
  const progressPercentage = (triagem.progress.completed / triagem.progress.total) * 100;

  return (
    <View className="bg-white rounded-lg p-4 shadow-[0_3px_30px_rgba(16,16,16,0.03)] mt-6">
      <Text className="font-semibold text-textPrimary text-xl mb-4">
        Progresso Atual
      </Text>

      <View className="flex-row justify-between mb-1">
        <Text className="font-bold text-textPrimary">
          {triagem.location}
        </Text>
        <Text className="text-textSecondary">
          {new Date(triagem.date).toLocaleDateString("pt-BR")}
        </Text>
      </View>

      <View className="h-1 bg-[#E8E8F6] rounded-full mt-3 mb-2">
        <View
          className="h-1 bg-primary rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </View>

      <Text className="text-textSecondary text-sm mb-4">
        {triagem.progress.completed}/{triagem.progress.total} exercícios concluídos
      </Text>

      <Button
        title="Continuar"
        onPress={() => {
          console.log("Continuar button - navigating to triagem with ID:", triagem.id);
          const params = {
            id: triagem.id,
            type: triagem.type === "Dor" ? "pain" : "mental",
          };
          const queryString = `?id=${encodeURIComponent(params.id)}&type=${encodeURIComponent(params.type)}`;
          router.push(`/(tabs)/(triagem)/diagnostic-ideal${queryString}`);
        }}
      />
    </View>
  );
};