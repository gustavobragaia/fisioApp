import Pana from "@/assets/images/triagem/Pana";
import { useDiagnosticData } from "@/hooks/useDiagnosticData";
import { ApiResponseData } from "@/types/diagnostic";
import { generic_diagnostics, motivational_messages } from "@/utils/messages";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import { EmptyState } from "../EmptyState";
import { ExerciseFromBack } from "../ExerciseGroupList";
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

  console.log("Params in ResultDiagnostic:", params, "Type:", type, "Triagem ID:", triagemId);

  const {
    user,
    exercises,
    isLoading,
    isError,
    error,
  } = useDiagnosticData(type, triagemId);

  const generateGenericMessages = (messageType: "pain" | "mental") => {
    const motivationalMessages = motivational_messages[messageType];
    const diagnosticMessages = generic_diagnostics[messageType];

    const randomMotivational =
      motivationalMessages[
        Math.floor(Math.random() * motivationalMessages.length)
      ];

    const randomDiagnostic =
      diagnosticMessages[Math.floor(Math.random() * diagnosticMessages.length)];

    return {
      motivational: randomMotivational,
      diagnostic: randomDiagnostic,
    };
  };

  const parseApiResponse = (): ApiResponseData | null => {
    try {
      if (!params.apiResponse) return null;

      const response =
        typeof params.apiResponse === "string"
          ? JSON.parse(params.apiResponse)
          : params.apiResponse;

      return Array.isArray(response) ? response[0] : response;
    } catch {
      // console.error("Error parsing API response:", error);
      return null;
    }
  };

  const parsedResponse = parseApiResponse();

  const genericMessages = !parsedResponse
    ? generateGenericMessages(type)
    : null;

  const fraseMotivacional =
    parsedResponse?.output?.["Frase Motivacional"] ||
    genericMessages?.motivational ||
    (type === "pain"
      ? "Cada movimento é um passo para o bem-estar!"
      : "Cuidar da mente é tão importante quanto cuidar do corpo!");

  const diagnostico =
    parsedResponse?.output?.Diagnostico ||
    genericMessages?.diagnostic ||
    (type === "pain"
      ? "Com base na sua avaliação, identificamos exercícios personalizados para seu bem-estar."
      : "Práticas de respiração e meditação podem ajudar a acalmar a mente.");

  const exercicios = parsedResponse?.output?.Exercicios || exercises;

  const mapDifficulty = (diff: string) => {
    switch (diff?.toLowerCase()) {
      case "iniciante":
        return "fácil";
      case "intermediário":
      case "intermediario":
        return "médio";
      case "avançado":
      case "avancado":
        return "difícil";
      default:
        return "médio";
    }
  };

  const exerciciosFormatted = (exercicios || []).map((item) => ({
    ...item,
    nome: item.name || item.nome,
    descricao: item.description || item.descricao,
    tipo: item.group_type || item.tipo,
    exerciseCount: 1,
    title: item.name || item.nome,
    duration: item.duration ? `${item.duration} segundos` : "30 segundos",
    difficulty: mapDifficulty(item.difficulty),
    progress: "pending",
    imageUrl: item.thumbnail_url || "https://placehold.co/150x150",
  }));

  const validExercicios = exerciciosFormatted.filter(
    (item) => item && (item.nome || item.name) && (item.tipo || item.group_type)
  );

  const parseDurationToSeconds = (durationStr: string): number => {
    try {
      const match = durationStr.match(/\d+/);
      if (!match) return 30;

      const value = parseInt(match[0], 10);

      if (durationStr.includes("minuto")) {
        return value * 60;
      }

      return Math.min(value, 30);
    } catch {
      // console.error("Error parsing duration:", error);
      return 30;
    }
  };

  const handleCardPress = async (item: ExerciseFromBack) => {
    const durationInSeconds = parseDurationToSeconds(item.duration);

    const exercisesToUse = validExercicios;

    const exerciseIndex = exercisesToUse.findIndex((ex) => ex.id === item.id);

    router.push({
      pathname: "/(tabs)/(triagem)/(exercises)/single-exercise",
      params: {
        exerciseId: item.id,
        exerciseName: item.name,
        exerciseVideoUrl: item.video_url,
        exerciseSteps: JSON.stringify(item.steps),
        exerciseDuration: durationInSeconds.toString(),
        exerciseIndex: Math.max(0, exerciseIndex).toString(),
        totalExercises: exercisesToUse.length.toString(),
        groupId: item.tipo || item.group_type,
        triagemId: triagemId || params.triagemId,
        allExercises: JSON.stringify(exercisesToUse),
      },
    });
  };

  const getCardVariant = (tipo: string): "primary" | "secondary" => {
    if (!tipo) return "secondary";

    const primaryTypes = ["alivio", "dor", "pain", "meditacao"];
    return primaryTypes.some((primaryType) =>
      tipo.toLowerCase().includes(primaryType.toLowerCase())
    )
      ? "primary"
      : "secondary";
  };

  const renderExerciseItem = ({ item }: { item: any }) => {
    if (
      !item ||
      (!item.nome && !item.name) ||
      (!item.tipo && !item.group_type)
    ) {
      return null;
    }

    return (
      <ExerciseCard
        title={item.nome || item.name || item.title}
        exerciseCount={item.exerciseCount || 1}
        description={item.descricao || item.description || ""}
        variant={getCardVariant(item.tipo || item.group_type)}
        onStartPress={() => handleCardPress(item)}
        onPress={() => handleCardPress(item)}
      />
    );
  };

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
    <ScrollView className="flex-1 p-6 pt-12">
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
        data={validExercicios}
        renderItem={renderExerciseItem}
        keyExtractor={(item, index) =>
          `exercise-${index}-${item?.tipo || item?.group_type || "unknown"}`
        }
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
