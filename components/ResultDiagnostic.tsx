/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from "react-native";
import Pana from "../assets/images/triagem/Pana";
// import { supabase } from "../lib/supabase"; // Comentado temporariamente
import colors from "../styles/colors";
import { EmptyState } from "./EmptyState";
import { ExerciseCard } from "./exercises/ExerciseCard";

type PainDiagnosticParams = {
  dorComMaisFreq: string;
  dorApareceEmQualSituacao: string;
  tipoDeDor: string;
  quandoDorComecou: string;
  nivelDeDor: string;
  comoAfetaMinhaVida: string;
  oQueGostariaDeAlcancarComAlivio: string;
  apiResponse?: string;
};

type MentalHealthParams = {
  anxietyLevel: string;
  stressLevel: string;
  sleepQuality: string;
  concentrationLevel: string;
  workStress: string;
  apiResponse?: string;
};

type ApiResponseData = {
  output: {
    "Frase Motivacional": string;
    Diagnostico: string;
    Exercicios: {
      nome: string;
      descricao: string;
      tipo: string;
      imageUrl?: string;
    }[];
  };
};

type ResultDiagnosticProps = {
  type?: "pain" | "mental";
  triagemId?: string;
};

// Mock data para exercícios de dor
const MOCK_PAIN_EXERCISES = [
  {
    nome: "Alívio de Dor",
    descricao: "Exercícios para aliviar dores agudas e crônicas",
    tipo: "alivio",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    nome: "Alongamento Matinal",
    descricao: "Série de alongamentos para iniciar o dia com mais disposição",
    tipo: "alongamento",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    nome: "Fortalecimento Lombar",
    descricao: "Exercícios para fortalecer a região lombar e prevenir dores",
    tipo: "fortalecimento",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    nome: "Aquecimento Pré-treino",
    descricao: "Prepare seu corpo antes de atividades físicas intensas",
    tipo: "aquecimento",
    imageUrl: "https://via.placeholder.com/150",
  },
];

// Mock data para exercícios de saúde mental
const MOCK_MENTAL_EXERCISES = [
  {
    nome: "Meditação Guiada",
    descricao: "Exercícios de meditação para acalmar a mente e reduzir ansiedade",
    tipo: "meditacao",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    nome: "Técnicas de Respiração",
    descricao: "Práticas de respiração para momentos de estresse e ansiedade",
    tipo: "respiracao",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    nome: "Relaxamento Muscular",
    descricao: "Sequência de relaxamento para aliviar tensão física causada por estresse",
    tipo: "relaxamento",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    nome: "Rotina para Dormir Melhor",
    descricao: "Práticas para melhorar a qualidade do sono e combater a insônia",
    tipo: "sono",
    imageUrl: "https://via.placeholder.com/150",
  },
];

// Mock data detalhada para exercícios específicos por categoria
const MOCK_DETAILED_EXERCISES = {
  // Exercícios de dor
  alongamento: [
    {
      id: "1",
      name: "Alongamento de Coluna",
      description: "Exercício para alongar a coluna e aliviar tensões",
      imageUrl: "https://via.placeholder.com/150",
      steps: [
        "Sente-se com a coluna ereta",
        "Incline lentamente para um lado",
        "Mantenha por 15 segundos",
        "Repita para o outro lado",
      ],
      duration: "2 minutos",
      difficulty: "fácil",
    },
    {
      id: "2",
      name: "Alongamento Cervical",
      description: "Alívio de tensão no pescoço e ombros",
      imageUrl: "https://via.placeholder.com/150",
      steps: [
        "Incline a cabeça para direita",
        "Mantenha por 15 segundos",
        "Incline para a esquerda",
        "Mantenha por 15 segundos",
      ],
      duration: "2 minutos",
      difficulty: "fácil",
    },
  ],
  fortalecimento: [
    {
      id: "3",
      name: "Ponte para Lombar",
      description: "Fortalecimento da região lombar e glúteos",
      imageUrl: "https://via.placeholder.com/150",
      steps: [
        "Deite-se de costas",
        "Dobre os joelhos com os pés apoiados",
        "Eleve o quadril",
        "Mantenha por 10 segundos",
      ],
      duration: "3 minutos",
      difficulty: "médio",
    },
    {
      id: "4",
      name: "Prancha Abdominal",
      description: "Fortalecimento do core para estabilidade da coluna",
      imageUrl: "https://via.placeholder.com/150",
      steps: [
        "Apoie-se nos antebraços e pés",
        "Mantenha o corpo alinhado",
        "Contraia o abdômen",
        "Mantenha por 30 segundos",
      ],
      duration: "3 minutos",
      difficulty: "médio",
    },
  ],
  aquecimento: [
    {
      id: "5",
      name: "Mobilidade Articular",
      description: "Aquecimento das principais articulações",
      imageUrl: "https://via.placeholder.com/150",
      steps: [
        "Gire os punhos",
        "Gire os tornozelos",
        "Movimente os ombros em círculos",
        "Gire a cabeça suavemente",
      ],
      duration: "5 minutos",
      difficulty: "fácil",
    },
  ],
  alivio: [
    {
      id: "6",
      name: "Alívio de Tensão Cervical",
      description: "Exercício para aliviar dores na região do pescoço",
      imageUrl: "https://via.placeholder.com/150",
      steps: [
        "Incline a cabeça para um lado",
        "Mantenha por 15 segundos",
        "Repita para o outro lado",
        "Faça movimentos circulares suaves",
      ],
      duration: "3 minutos",
      difficulty: "fácil",
    },
  ],
  
  // Exercícios de saúde mental
  meditacao: [
    {
      id: "7",
      name: "Meditação de Atenção Plena",
      description: "Foque sua atenção na respiração e nos pensamentos presentes",
      imageUrl: "https://via.placeholder.com/150",
      steps: [
        "Sente-se confortavelmente",
        "Feche os olhos e respire profundamente",
        "Observe seus pensamentos sem julgá-los",
        "Retorne o foco à respiração quando necessário",
      ],
      duration: "10 minutos",
      difficulty: "fácil",
    },
    {
      id: "8",
      name: "Meditação para Ansiedade",
      description: "Técnica específica para momentos de ansiedade",
      imageUrl: "https://via.placeholder.com/150",
      steps: [
        "Encontre um local tranquilo",
        "Respire contando até 4",
        "Segure por 2 segundos",
        "Expire contando até 6",
      ],
      duration: "5 minutos",
      difficulty: "médio",
    },
  ],
  respiracao: [
    {
      id: "9",
      name: "Respiração 4-7-8",
      description: "Técnica de respiração para acalmar o sistema nervoso",
      imageUrl: "https://via.placeholder.com/150",
      steps: [
        "Inspire pelo nariz contando até 4",
        "Segure a respiração contando até 7",
        "Expire pela boca contando até 8",
        "Repita 4 vezes",
      ],
      duration: "3 minutos",
      difficulty: "fácil",
    },
    {
      id: "10",
      name: "Respiração Diafragmática",
      description: "Respiração profunda usando o diafragma",
      imageUrl: "https://via.placeholder.com/150",
      steps: [
        "Deite-se confortavelmente",
        "Coloque uma mão no peito e outra no abdômen",
        "Respire profundamente pelo nariz, expandindo o abdômen",
        "Expire lentamente pela boca",
      ],
      duration: "5 minutos",
      difficulty: "médio",
    },
  ],
  relaxamento: [
    {
      id: "11",
      name: "Relaxamento Muscular Progressivo",
      description: "Tensione e relaxe grupos musculares para aliviar tensão",
      imageUrl: "https://via.placeholder.com/150",
      steps: [
        "Comece pelos pés, tensionando por 5 segundos",
        "Relaxe completamente",
        "Avance para as pernas e continue pelo corpo",
        "Termine com músculos faciais",
      ],
      duration: "15 minutos",
      difficulty: "médio",
    },
  ],
  sono: [
    {
      id: "12",
      name: "Rotina de Relaxamento Noturno",
      description: "Sequência de atividades para preparar o corpo para dormir",
      imageUrl: "https://via.placeholder.com/150",
      steps: [
        "Desligue eletrônicos 1h antes de dormir",
        "Tome um banho morno",
        "Pratique respiração lenta por 5 minutos",
        "Faça alongamentos suaves",
      ],
      duration: "30 minutos",
      difficulty: "fácil",
    },
    {
      id: "13",
      name: "Meditação para Dormir",
      description: "Meditação guiada para induzir o sono",
      imageUrl: "https://via.placeholder.com/150",
      steps: [
        "Deite-se na cama",
        "Respire profundamente",
        "Visualize um local tranquilo e seguro",
        "Conte de 100 para trás lentamente",
      ],
      duration: "10 minutos",
      difficulty: "fácil",
    },
  ],
};

function ResultDiagnostic({
  type = "pain",
  triagemId: propTriagemId,
}: ResultDiagnosticProps) {
  const params = useLocalSearchParams<PainDiagnosticParams & MentalHealthParams>();
  const router = useRouter();

  // Estados
  const [loadingExercises, setLoadingExercises] = useState(true);
  const [userId, setUserId] = useState<string | null>("mock-user-id");
  const [triagemId, setTriagemId] = useState<string | null>(propTriagemId || "mock-triagem-id");

  // Parsear resposta da API (ou usar mock)
  const parseApiResponse = () => {
    try {
      if (!params.apiResponse) return null;

      return typeof params.apiResponse === "string"
        ? JSON.parse(params.apiResponse)[0]
        : params.apiResponse;
    } catch (error) {
      console.error("Error parsing API response:", error);
      return null;
    }
  };

  const parsedResponse = parseApiResponse();

  // Mensagens motivacionais e diagnósticos
  const fraseMotivacional =
    parsedResponse?.output?.["Frase Motivacional"] ||
    (type === "pain"
      ? "Cada movimento é um passo para o bem-estar!"
      : "Cuidar da mente é tão importante quanto cuidar do corpo!");

  const diagnostico =
    parsedResponse?.output?.Diagnostico ||
    (type === "pain"
      ? "Com base na sua avaliação, identificamos que você pode se beneficiar de exercícios de alongamento e fortalecimento. Recomendamos começar com atividades de baixo impacto e aumentar gradualmente a intensidade."
      : "Com base na sua avaliação, identificamos que você pode se beneficiar de exercícios para reduzir ansiedade e melhorar a qualidade do sono. Práticas de respiração e meditação podem ajudar a acalmar a mente e preparar o corpo para um descanso melhor.");

  // Usar dados mock em vez de buscar do banco
  const exercicios = parsedResponse?.output?.Exercicios || 
    (type === "pain" ? MOCK_PAIN_EXERCISES : MOCK_MENTAL_EXERCISES);

  // Simular carregamento
  useEffect(() => {
    const simulateLoading = async () => {
      setLoadingExercises(true);
      // Simular delay de carregamento
      setTimeout(() => {
        setLoadingExercises(false);
      }, 1000);
    };

    simulateLoading();

    /* 
    // CÓDIGO DO BACKEND - REATIVAR QUANDO O BACKEND ESTIVER FUNCIONANDO
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoadingExercises(false);
          return;
        }

        setUserId(user.id);

        let currentTriagemId = triagemId;

        if (!currentTriagemId) {
          const { data: triagens, error: triagemError } = await supabase
            .from("triagens")
            .select("id")
            .eq("user_id", user.id)
            .eq("type", type)
            .order("created_at", { ascending: false })
            .limit(1);

          if (triagemError || !triagens || triagens.length === 0) {
            console.error("Error fetching triagem:", triagemError);
            setLoadingExercises(false);
            return;
          }

          currentTriagemId = triagens[0].id;
          setTriagemId(currentTriagemId);
        }

        const { data: userExercises, error: userExercisesError } = await supabase
          .from("user_exercises")
          .select("exercise_id")
          .eq("user_id", user.id)
          .eq("triagem_id", currentTriagemId);

        if (userExercisesError) {
          console.error("Error fetching user exercises:", userExercisesError);
          setLoadingExercises(false);
          return;
        }

        if (!userExercises || userExercises.length === 0) {
          setLoadingExercises(false);
          return;
        }

        const exerciseIds = userExercises.map((ue) => ue.exercise_id);
        const { data: exercises, error: exercisesError } = await supabase
          .from("exercises")
          .select("*")
          .in("id", exerciseIds);

        if (exercisesError) {
          console.error("Error fetching exercises:", exercisesError);
          setLoadingExercises(false);
          return;
        }

        // Processar exercícios do banco...
        setLoadingExercises(false);
      } catch (error) {
        console.error("Error in fetchUserData:", error);
        setLoadingExercises(false);
      }
    };

    fetchUserData();
    */
  }, [type, triagemId]);

  // Função para obter exercícios de uma categoria (usando mock)
  const getExercisesForCategory = (categoryType: string) => {
    return MOCK_DETAILED_EXERCISES[categoryType as keyof typeof MOCK_DETAILED_EXERCISES] || [
      {
        id: "default",
        name: `${categoryType} - Exercício Padrão`,
        description: "Descrição do exercício padrão",
        imageUrl: "https://via.placeholder.com/150",
        steps: ["Passo 1", "Passo 2", "Passo 3"],
        duration: "5 minutos",
        difficulty: "fácil",
      },
    ];
  };

  // Função para obter classes de estilo por tipo de exercício
  const getExerciseTypeClass = (tipo: string) => {
    const painClasses: Record<string, { bg: string; text: string }> = {
      alongamento: { bg: "bg-[#CDEFE8]", text: "text-textPrimary" },
      fortalecimento: { bg: "bg-[#aee1f969]", text: "text-deepBlue" },
      aquecimento: { bg: "bg-[#AEE1F9]", text: "text-textPrimary" },
      alivio: { bg: "bg-[#F4F1EE]", text: "text-textPrimary" },
    };

    const mentalClasses: Record<string, { bg: string; text: string }> = {
      meditacao: { bg: "bg-[#8E9BFF40]", text: "text-textPrimary" },
      respiracao: { bg: "bg-[#aee1f969]", text: "text-deepBlue" },
      relaxamento: { bg: "bg-[#CDEFE8]", text: "text-textPrimary" },
      sono: { bg: "bg-[#F4F1EE]", text: "text-textPrimary" },
    };

    const typeClasses = type === "pain" ? painClasses : mentalClasses;
    return typeClasses[tipo] || { bg: "bg-[#F4F1EE]", text: "text-textPrimary" };
  };

  // Renderizar item de exercício
  const renderExerciseItem = ({ item }: { item: any }) => {
    const getExerciseCount = (categoryType: string) => {
      const exercises = getExercisesForCategory(categoryType);
      return exercises?.length || 0;
    };

    const getCardVariant = (tipo: string) => {
      const primaryTypes = ["alivio", "dor", "pain", "meditacao"];
      return primaryTypes.some(primaryType => 
        tipo.toLowerCase().includes(primaryType.toLowerCase())
      ) ? "primary" : "secondary";
    };

    const handleStartPress = () => {
      const exercises = getExercisesForCategory(item.tipo);
      router.push({
        pathname: "/(tabs)/(triagem)/(exercises)/exercise-group",
        params: {
          categoryName: item.nome,
          categoryType: item.tipo,
          exercises: JSON.stringify(exercises),
          triagemId: triagemId || undefined,
          autoStart: "true",
        },
      });
    };

    const handleCardPress = () => {
      const exercises = getExercisesForCategory(item.tipo);
      router.push({
        pathname: "/(tabs)/(triagem)/(exercises)/exercise-group",
        params: {
          categoryName: item.nome,
          categoryType: item.tipo,
          exercises: JSON.stringify(exercises),
          triagemId: triagemId || undefined,
        },
      });
    };

    return (
      <ExerciseCard
        title={item.nome}
        exerciseCount={getExerciseCount(item.tipo)}
        description={item.descricao}
        variant={getCardVariant(item.tipo)}
        onStartPress={handleStartPress}
        onPress={handleCardPress}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-6">
        <View className="items-center mt-3">
          <Pana width={Dimensions.get("window").width - 48} />
        </View>

        <View className="items-center mt-12">
          <Text className="text-3xl font-bold text-textPrimary text-center">
            {fraseMotivacional}
          </Text>
          <Text className="text-xl text-textPrimary mt-2 text-center">
            {type === "pain"
              ? "Gustavo, separei esse treino personalizado para você!"
              : "Separamos práticas para ajudar sua saúde mental!"}
          </Text>
        </View>

        <View className="my-8">
          <EmptyState variant="diagnostico" title={diagnostico} />
        </View>

        <Text className="text-xl font-bold text-textPrimary mb-4">
          {type === "pain"
            ? "Exercícios Recomendados"
            : "Práticas Recomendadas"}
        </Text>

        {loadingExercises ? (
          <View className="items-center my-8">
            <ActivityIndicator size="large" color={colors.primary} />
            <Text className="text-textPrimary mt-2">
              Carregando exercícios...
            </Text>
          </View>
        ) : (
          <FlatList
            data={exercicios}
            renderItem={renderExerciseItem}
            keyExtractor={(item, index) => `exercise-${index}-${item.tipo}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <EmptyState 
                title="Nenhum exercício encontrado" 
                variant="sad" 
              />
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ResultDiagnostic;