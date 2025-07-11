import Pana from "@/assets/images/triagem/Pana";
import { useDiagnosticData } from "@/hooks/useDiagnosticData";
import { ApiResponseData, Exercise } from "@/types/diagnostic";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import { EmptyState } from "../EmptyState";
import { ExerciseCard } from "../exercises/ExerciseCard";
import { Loading } from "../Loading";

interface ResultDiagnosticProps {
  type?: "pain" | "mental";
  triagemId?: string;
}

export function ResultDiagnostic({
  type = "pain",
  triagemId,
}: ResultDiagnosticProps) {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    user,
    triagemId: currentTriagemId,
    exercises,
    isLoading,
    isError,
    error,
    getExercisesForCategory,
  } = useDiagnosticData(type, triagemId);

  const parseApiResponse = (): ApiResponseData | null => {
    try {
      if (!params.apiResponse) return null;

      const response =
        typeof params.apiResponse === "string"
          ? JSON.parse(params.apiResponse)
          : params.apiResponse;

      return Array.isArray(response) ? response[0] : response;
    } catch (error) {
      console.error("Error parsing API response:", error);
      return null;
    }
  };

  const parsedResponse = parseApiResponse();

  const fraseMotivacional =
    parsedResponse?.output?.["Frase Motivacional"] ||
    (type === "pain"
      ? "Cada movimento é um passo para o bem-estar!"
      : "Cuidar da mente é tão importante quanto cuidar do corpo!");

  const diagnostico =
    parsedResponse?.output?.Diagnostico ||
    (type === "pain"
      ? "Com base na sua avaliação, identificamos exercícios personalizados para seu bem-estar."
      : "Práticas de respiração e meditação podem ajudar a acalmar a mente.");

  const exercicios = parsedResponse?.output?.Exercicios || exercises;

  const handleCardPress = async (item: Exercise) => {
    const categoryExercises = await getExercisesForCategory(item.tipo);

    router.push({
      pathname: "/(tabs)/(triagem)/(exercises)/exercise-group",
      params: {
        categoryName: item.nome,
        categoryType: item.tipo,
        exercises: JSON.stringify(categoryExercises),
        triagemId: currentTriagemId || undefined,
      },
    });
  };

  const handleStartPress = async (item: Exercise) => {
    const categoryExercises = await getExercisesForCategory(item.tipo);

    router.push({
      pathname: "/(tabs)/(triagem)/(exercises)/exercise-group",
      params: {
        categoryName: item.nome,
        categoryType: item.tipo,
        exercises: JSON.stringify(categoryExercises),
        triagemId: currentTriagemId || undefined,
        autoStart: "true",
      },
    });
  };

  const getCardVariant = (tipo: string): "primary" | "secondary" => {
    const primaryTypes = ["alivio", "dor", "pain", "meditacao"];
    return primaryTypes.some((primaryType) =>
      tipo.toLowerCase().includes(primaryType.toLowerCase())
    )
      ? "primary"
      : "secondary";
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <ExerciseCard
      title={item.nome}
      exerciseCount={item.exerciseCount || 1}
      description={item.descricao}
      variant={getCardVariant(item.tipo)}
      onStartPress={() => handleStartPress(item)}
      onPress={() => handleCardPress(item)}
    />
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-center">
          Erro ao carregar dados:{" "}
          {error instanceof Error ? error.message : "Erro desconhecido"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4 pt-12">
      <View className="items-center">
        <Pana width={Dimensions.get("window").width - 48} />
      </View>

      <View className="items-center mt-12">
        <Text className="text-3xl font-bold text-textPrimary text-center">
          {fraseMotivacional}
        </Text>
        <Text className="text-xl text-textPrimary mt-2 text-center">
          {type === "pain"
            ? `${
                user?.user_metadata?.name || user?.email || "Usuário"
              }, separei esse treino personalizado para você!`
            : "Separamos práticas para ajudar sua saúde mental!"}
        </Text>
      </View>

      <View className="my-8">
        <EmptyState variant="diagnostico" title={diagnostico} />
      </View>

      <Text className="text-xl font-bold text-textPrimary mb-4">
        {type === "pain" ? "Exercícios Recomendados" : "Práticas Recomendadas"}
      </Text>

      <FlatList
        data={exercicios}
        renderItem={renderExerciseItem}
        keyExtractor={(item, index) => `exercise-${index}-${item.tipo}`}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 100 }}
        ListEmptyComponent={
          <EmptyState
            title={`Nenhum ${
              type === "pain" ? "exercício" : "prática"
            } encontrado`}
            variant="sad"
          />
        }
      />
    </ScrollView>
  );
}
