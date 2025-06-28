/* eslint-disable react/display-name */
import colors from "@/styles/colors";
import { useRouter } from "expo-router";
import { ArrowRight2, ExportCircle } from "iconsax-react-native";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import handleMentalHealthSymptomsToN8n from "../api/handleMentalHealthSymptomsToN8n";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./Button";
import { handleMentalHealthSubmission } from "./MentalHealthHandler";
import { OptionCard } from "./OptionCard";

export type FormMentalHealthRefType = {
  resetForm: () => void;
};

const FormMentalHealth = forwardRef<FormMentalHealthRefType>((props, ref) => {
  const router = useRouter();
  const { user } = useAuth();

  const [comoEstaSentindo, setComoEstaSentindo] = useState("");
  const [frequenciaSentimento, setFrequenciaSentimento] = useState("");
  const [dificuldadeFrequente, setDificuldadeFrequente] = useState("");
  const [impactoRotina, setImpactoRotina] = useState("");
  const [buscouAjuda, setBuscouAjuda] = useState("");
  const [objetivoAlivio, setObjetivoAlivio] = useState("");

  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      setComoEstaSentindo("");
      setFrequenciaSentimento("");
      setDificuldadeFrequente("");
      setImpactoRotina("");
      setBuscouAjuda("");
      setObjetivoAlivio("");
      setResponse("");
      setCurrentScreen(0);
      setIsLoading(false);
    },
  }));

  const questions = [
    {
      question: "Como você está se sentindo hoje?",
      state: comoEstaSentindo,
      setState: setComoEstaSentindo,
      options: [
        {
          label: "Ansioso(a)",
          value: "ansioso",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/3081/3081383.png",
          },
        },
        {
          label: "Estressado(a)",
          value: "estressado",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/2151/2151795.png",
          },
        },
        {
          label: "Com dificuldade para dormir",
          value: "dificuldadeDormir",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/3094/3094837.png",
          },
        },
        {
          label: "Triste ou desanimado(a)",
          value: "triste",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/2877/2877300.png",
          },
        },
        {
          label: "Irritado(a)",
          value: "irritado",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/2877/2877300.png",
          },
        },
        {
          label: "Quero manter meu bem-estar",
          value: "manterBemEstar",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/4320/4320337.png",
          },
        },
      ],
    },
    {
      question: "Com que frequência você sente isso?",
      state: frequenciaSentimento,
      setState: setFrequenciaSentimento,
      options: [
        {
          label: "Todos os dias",
          value: "todosDias",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/2693/2693507.png",
          },
        },
        {
          label: "3 a 5 vezes por semana",
          value: "3a5Semana",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/2693/2693642.png",
          },
        },
        {
          label: "1 a 2 vezes por semana",
          value: "1a2Semana",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/2693/2693646.png",
          },
        },
        {
          label: "Raramente",
          value: "raramente",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/2693/2693636.png",
          },
        },
      ],
    },
    {
      question: "Qual destas dificuldades você enfrenta com mais frequência?",
      state: dificuldadeFrequente,
      setState: setDificuldadeFrequente,
      options: [
        {
          label: "Pensamentos acelerados",
          value: "pensamentosAcelerados",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/2645/2645233.png",
          },
        },
        {
          label: "Preocupações excessivas",
          value: "preocupacoesExcessivas",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/471/471664.png",
          },
        },
        {
          label: "Dificuldade para relaxar",
          value: "dificuldadeRelaxar",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/2548/2548531.png",
          },
        },
        {
          label: "Insônia ou sono leve",
          value: "insonia",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/3094/3094837.png",
          },
        },
        {
          label: "Oscilações de humor",
          value: "oscilacoesHumor",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/2877/2877300.png",
          },
        },
        {
          label: "Sensação de esgotamento emocional",
          value: "esgotamentoEmocional",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/3997/3997872.png",
          },
        },
      ],
    },
    {
      question: "Como isso impacta sua rotina diária?",
      state: impactoRotina,
      setState: setImpactoRotina,
      options: [
        {
          label: "Dificulta minha concentração",
          value: "dificultaConcentracao",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/2645/2645233.png",
          },
        },
        {
          label: "Me sinto sem energia para trabalhar",
          value: "semEnergia",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/3281/3281289.png",
          },
        },
        {
          label: "Afeta meus relacionamentos",
          value: "afetaRelacionamentos",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/4543/4543344.png",
          },
        },
        {
          label: "Prejudica meu sono",
          value: "prejudicaSono",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/3094/3094837.png",
          },
        },
        {
          label: "Afeta minha saúde física",
          value: "afetaSaudeFisica",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/2936/2936886.png",
          },
        },
        {
          label: "Não impacta, mas quero melhorar",
          value: "naoImpacta",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/1682/1682443.png",
          },
        },
      ],
    },
    {
      question: "Você já buscou ajuda anteriormente?",
      state: buscouAjuda,
      setState: setBuscouAjuda,
      options: [
        {
          label: "Sim, faço terapia regularmente",
          value: "terapiaRegular",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/4320/4320337.png",
          },
        },
        {
          label: "Sim, já fiz terapia ou tomei medicação",
          value: "terapiaOuMedicacao",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/3209/3209074.png",
          },
        },
        {
          label: "Não, nunca busquei ajuda",
          value: "nuncaBuscouAjuda",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/471/471664.png",
          },
        },
      ],
    },
    {
      question: "O que você gostaria de alcançar com o Alívio.com?",
      state: objetivoAlivio,
      setState: setObjetivoAlivio,
      options: [
        {
          label: "Reduzir ansiedade ou estresse",
          value: "reduzirAnsiedade",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/3081/3081383.png",
          },
        },
        {
          label: "Dormir melhor",
          value: "dormirMelhor",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/3094/3094837.png",
          },
        },
        {
          label: "Controlar meus pensamentos",
          value: "controlarPensamentos",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/2645/2645233.png",
          },
        },
        {
          label: "Melhorar meu bem-estar emocional",
          value: "melhorarBemEstar",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/4320/4320337.png",
          },
        },
        {
          label: "Criar uma rotina mental saudável",
          value: "criarRotina",
          imageSource: {
            uri: "https://cdn-icons-png.flaticon.com/128/4543/4543344.png",
          },
        },
      ],
    },
  ];

  const goToNextScreen = () => {
    if (currentScreen < questions.length) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const goToPreviousScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const sendDataToN8n = async () => {
    try {
      setIsLoading(true);

      // Send data to n8n API with user data
      const webhookResponse = await handleMentalHealthSymptomsToN8n(
        comoEstaSentindo,
        frequenciaSentimento,
        dificuldadeFrequente,
        impactoRotina,
        buscouAjuda,
        objetivoAlivio,
        user || undefined
      );

      setResponse(webhookResponse);
      console.log("Webhook response:", webhookResponse);

      const supabaseResult = await handleMentalHealthSubmission({
        comoEstaSentindo,
        frequenciaSentimento,
        dificuldadeFrequente,
        impactoRotina,
        buscouAjuda,
        objetivoAlivio,
        onSuccess: (triagemId) => {
          console.log(
            "Mental health data saved to Supabase with triagem ID:",
            triagemId
          );
        },
        onError: (error) => {
          console.error("Error saving to Supabase:", error);
        },
      });

      router.push({
        pathname: "/(tabs)/(triagem)/diagnostic-ideal",
        params: {
          type: "mental",
          triagemId: supabaseResult.success
            ? supabaseResult.triagemId
            : undefined,
          comoEstaSentindo,
          frequenciaSentimento,
          dificuldadeFrequente,
          impactoRotina,
          buscouAjuda,
          objetivoAlivio,
          apiResponse: webhookResponse,
        },
      });
    } catch (error) {
      console.error("Error sending mental health data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderDotsIndicator = () => {
    const screenWidth = Dimensions.get("window").width;
    const containerPadding = 24;
    const dotMargin = 12;
    const totalMargins = (questions.length - 1) * dotMargin;
    const availableWidth = screenWidth - containerPadding - totalMargins;
    const dotWidth = availableWidth / questions.length;

    return (
      <View className="flex-row justify-center items-center mt-8 mb-6 px-4 gap-1">
        {questions.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full mx-0.5 ${
              index === currentScreen ? "bg-primary" : "bg-paleSand"
            }`}
            style={{ width: dotWidth }}
          />
        ))}
      </View>
    );
  };

  const renderQuestionContent = () => {
    const currentQuestion = questions[currentScreen];

    return (
      <View className="flex-1">
        <Text className="text-2xl font-bold mb-8 text-textPrimary">
          {currentQuestion.question}
        </Text>

        <ScrollView className="flex-1">
          <View className="flex-row flex-wrap justify-between">
            {currentQuestion.options.map((option) => (
              <View key={option.value} className="w-[48%] mb-4">
                <OptionCard
                  title={option.label}
                  value={option.value}
                  selectedValue={currentQuestion.state}
                  icon={
                    <Image
                      source={option.imageSource}
                      width={24}
                      height={24}
                      alt={option.label}
                    />
                  }
                  onPress={() => currentQuestion.setState(option.value)}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderLoadingState = () => (
    <View className="flex-1 justify-center items-center p-6">
      <ActivityIndicator size="large" color={colors.primary} />
      <Text className="text-lg text-center mt-4 text-textPrimary">
        Colhendo dados da triagem...
      </Text>
    </View>
  );

  const renderCompletionState = () => (
    <View className="flex-1 justify-center items-center p-6">
      <Text className="text-2xl font-bold mb-4 text-deepBlue">
        Obrigado por responder!
      </Text>
      <Text className="text-lg text-center mb-6 text-textPrimary">
        Suas respostas foram enviadas com sucesso.
      </Text>
      {response && (
        <Text className="text-sm mt-4 text-textPrimary">
          Resposta: {response}
        </Text>
      )}
    </View>
  );

  const renderNavigationButtons = () => {
    const currentQuestion = questions[currentScreen];
    const isLastScreen = currentScreen === questions.length - 1;
    const hasAnswer = currentQuestion?.state;

    return (
      <View className="flex-row justify-between py-4">
        <Button
          onPress={goToPreviousScreen}
          disabled={currentScreen === 0}
          title="Voltar"
          variant="secondary"
        />

        <Button
          title={!isLastScreen ? "Próxima" : "Enviar Dados"}
          iconPosition={!isLastScreen ? "right" : "left"}
          Icon={!isLastScreen ? ArrowRight2 : ExportCircle}
          onPress={
            !isLastScreen
              ? goToNextScreen
              : async () => {
                  await sendDataToN8n();
                  setCurrentScreen(currentScreen + 1);
                }
          }
          disabled={!hasAnswer}
        />
      </View>
    );
  };

  const renderMainContent = () => {
    // if (isLoading) {
    //   return renderLoadingState();
    // }

    if (currentScreen >= questions.length) {
      return renderCompletionState();
    }

    return (
      <>
        {renderDotsIndicator()}
        <Text className="text-3xl font-bold text-textPrimary">
          Avaliação de saúde mental
        </Text>
        <Text className="text-lg text-slate-600 mt-2 mb-8">
          Vamos entender melhor como você está se sentindo para recomendar os
          melhores exercícios
        </Text>
        {renderQuestionContent()}
        {renderNavigationButtons()}
      </>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {renderMainContent()}
    </SafeAreaView>
  );
});

export default FormMentalHealth;
