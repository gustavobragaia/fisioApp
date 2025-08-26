import { Button } from "@/components/Button";
import colors from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Toast } from "react-native-toast-notifications";

interface Answer {
  questionId: string;
  value: number;
}

interface QuestionnaireScreenProps {
  navigation?: any;
}

const FormularioNR1Screen: React.FC<QuestionnaireScreenProps> = ({
  navigation,
}) => {
  const [currentScreen, setCurrentScreen] = useState<
    "home" | "questionnaire" | "completed"
  >("home");
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isFormAvailable, setIsFormAvailable] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportText, setReportText] = useState<string>("");

  const questions = [
    {
      category: "Demandas de Trabalho",
      items: [
        { id: "1.1", text: "Você tem que trabalhar muito rápido?" },
        { id: "1.2", text: "Você tem um grande volume de trabalho?" },
        { id: "1.3", text: "Seu trabalho exige concentração intensa?" },
      ],
    },
    {
      category: "Autonomia e Controle",
      items: [
        { id: "2.1", text: "Você pode decidir como realizar seu trabalho?" },
        {
          id: "2.2",
          text: "Você pode decidir o ritmo em que realiza suas tarefas?",
        },
      ],
    },
    {
      category: "Apoio Social",
      items: [
        {
          id: "3.1",
          text: "Seus colegas estão dispostos a ajudar em situações de necessidade?",
        },
        { id: "3.2", text: "Você recebe apoio do seu superior imediato?" },
      ],
    },
    {
      category: "Feedback e Reconhecimento",
      items: [
        {
          id: "4.1",
          text: "Você recebe informações adequadas sobre a qualidade do seu trabalho?",
        },
        {
          id: "4.2",
          text: "Você recebe o reconhecimento que merece pelo seu trabalho?",
        },
      ],
    },
    {
      category: "Segurança no Trabalho",
      items: [
        {
          id: "5.1",
          text: "Você sente que existe um bom clima de cooperação entre colegas?",
        },
        {
          id: "5.2",
          text: "Você confia nas informações que recebe da gestão?",
        },
      ],
    },
    {
      category: "Exigências Emocionais",
      items: [
        {
          id: "6.1",
          text: "Seu trabalho exige que você esconda suas emoções?",
        },
        {
          id: "6.2",
          text: "Você sente que seu trabalho é emocionalmente exaustivo?",
        },
      ],
    },
    {
      category: "Satisfação no Trabalho",
      items: [
        {
          id: "7.1",
          text: "Você está satisfeito com suas perspectivas de carreira?",
        },
        {
          id: "7.2",
          text: "Você está satisfeito com as condições físicas de trabalho?",
        },
        {
          id: "7.3",
          text: "Você está satisfeito com o equilíbrio entre vida pessoal e profissional?",
        },
      ],
    },
    {
      category: "Saúde e Bem-estar",
      items: [
        {
          id: "8.1",
          text: "Você sente-se esgotado ao fim de um dia de trabalho?",
        },
        { id: "8.2", text: "Você se sente estressado por causa do trabalho?" },
        {
          id: "8.3",
          text: "Você apresenta sintomas físicos (como dores de cabeça, insônia, problemas estomacais) relacionados ao trabalho?",
        },
        {
          id: "8.4",
          text: "Considerando tudo, você está satisfeito com seu trabalho?",
        },
      ],
    },
  ];

  useEffect(() => {
    // Simular verificação se é último dia útil do mês
    // Em produção, você implementaria a lógica real aqui
    const isLastWorkingDay = checkIfLastWorkingDay();
    setIsFormAvailable(isLastWorkingDay);
  }, []);

  const checkIfLastWorkingDay = (): boolean => {
    // Implementar lógica real para verificar último dia útil
    // Por enquanto, retornando true para demonstração
    return true;
  };

  const getScaleLabel = (value: number, questionId: string): string => {
    const question = questions
      .flatMap((cat) => cat.items)
      .find((q) => q.id === questionId);

    if (!question) return "";

    // Determinar o tipo de escala baseado na pergunta
    const isFrequencyQuestion =
      question.text.includes("tem que") ||
      question.text.includes("exige") ||
      question.text.includes("sente-se") ||
      question.text.includes("apresenta");

    const isSatisfactionQuestion =
      question.text.includes("satisfeito") ||
      question.text.includes("reconhecimento") ||
      question.text.includes("informações adequadas");

    const isCapabilityQuestion =
      question.text.includes("pode decidir") ||
      question.text.includes("confia");

    const isSupportQuestion =
      question.text.includes("dispostos a ajudar") ||
      question.text.includes("recebe apoio") ||
      question.text.includes("clima de cooperação");

    if (isFrequencyQuestion) {
      if (value >= 0 && value <= 24) return "Nunca";
      if (value >= 25 && value <= 49) return "Raramente";
      if (value === 50) return "Às vezes";
      if (value >= 51 && value <= 75) return "Frequentemente";
      if (value >= 76 && value <= 100) return "Sempre";
    } else if (isSatisfactionQuestion) {
      if (value >= 0 && value <= 24) return "Muito insatisfeito";
      if (value >= 25 && value <= 49) return "Insatisfeito";
      if (value === 50) return "Neutro";
      if (value >= 51 && value <= 75) return "Satisfeito";
      if (value >= 76 && value <= 100) return "Muito satisfeito";
    } else if (isCapabilityQuestion || isSupportQuestion) {
      if (value >= 0 && value <= 24) return "Nunca";
      if (value >= 25 && value <= 49) return "Raramente";
      if (value === 50) return "Às vezes";
      if (value >= 51 && value <= 75) return "Frequentemente";
      if (value >= 76 && value <= 100) return "Sempre";
    } else {
      // Default para concordância
      if (value >= 0 && value <= 24) return "Discordo totalmente";
      if (value >= 25 && value <= 49) return "Discordo";
      if (value === 50) return "Neutro";
      if (value >= 51 && value <= 75) return "Concordo";
      if (value >= 76 && value <= 100) return "Concordo totalmente";
    }

    return "";
  };

  const getScaleLabels = (
    questionId: string
  ): { left: string; right: string } => {
    const question = questions
      .flatMap((cat) => cat.items)
      .find((q) => q.id === questionId);

    if (!question) return { left: "Discordo", right: "Concordo" };

    // Determinar labels baseado no tipo da pergunta
    if (
      question.text.includes("tem que") ||
      question.text.includes("exige") ||
      question.text.includes("sente-se") ||
      question.text.includes("apresenta")
    ) {
      return { left: "Nunca", right: "Sempre" };
    } else if (question.text.includes("satisfeito")) {
      return { left: "Insatisfeito", right: "Satisfeito" };
    } else if (
      question.text.includes("pode decidir") ||
      question.text.includes("dispostos a ajudar") ||
      question.text.includes("recebe apoio") ||
      question.text.includes("recebe informações") ||
      question.text.includes("recebe o reconhecimento") ||
      question.text.includes("confia") ||
      question.text.includes("clima de cooperação")
    ) {
      return { left: "Nunca", right: "Sempre" };
    }

    return { left: "Discordo", right: "Concordo" };
  };

  const getScaleColor = (value: number): string => {
    if (value >= 0 && value <= 24) return "text-red-500";
    if (value >= 25 && value <= 49) return "text-yellow-500";
    if (value === 50) return "text-gray-500";
    if (value >= 51 && value <= 75) return "text-greenLight";
    if (value >= 76 && value <= 100) return "text-primary";
    return "";
  };

  const canNavigateToCategory = (categoryIndex: number): boolean => {
    // Pode navegar para a categoria atual ou anteriores que foram preenchidas
    if (categoryIndex <= currentCategory) {
      return true;
    }

    // Para navegar para frente, precisa ter preenchido todas as categorias anteriores
    for (let i = 0; i < categoryIndex; i++) {
      const categoryQuestions = questions[i].items;
      const answeredQuestions = categoryQuestions.filter(
        (question) => getAnswerValue(question.id) !== null
      );

      if (answeredQuestions.length < categoryQuestions.length) {
        return false;
      }
    }

    return true;
  };

  const handleAnswerChange = (questionId: string, value: number) => {
    const updatedAnswers = answers.filter(
      (answer) => answer.questionId !== questionId
    );
    updatedAnswers.push({ questionId, value });
    setAnswers(updatedAnswers);
  };

  const getAnswerValue = (questionId: string): number | null => {
    const answer = answers.find((answer) => answer.questionId === questionId);
    return answer ? answer.value : null;
  };

  const handleNextCategory = () => {
    const currentCategoryQuestions = questions[currentCategory].items;
    const answeredQuestions = currentCategoryQuestions.filter(
      (question) => getAnswerValue(question.id) !== null
    );

    if (answeredQuestions.length < currentCategoryQuestions.length) {
      Toast.show(
        "Por favor, responda todas as perguntas desta categoria antes de continuar.",
        {
          type: "warning",
          placement: "top",
          duration: 3000,
          animationType: "slide-in",
        }
      );
      return;
    }

    if (currentCategory < questions.length - 1) {
      setCurrentCategory(currentCategory + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousCategory = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Respostas:", answers);
    setCurrentScreen("completed");
  };

  const handleReportSubmit = () => {
    if (!reportText.trim()) {
      Toast.show("Por favor, descreva a situação.", {
        type: "warning",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
      return;
    }

    console.log("Denúncia:", reportText);
    Toast.show(
      "Sua denúncia foi recebida e será tratada com absoluta confidencialidade.",
      {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      }
    );
    setReportText("");
    setShowReportModal(false);
  };

  const renderScale = (questionId: string) => {
    const currentValue = getAnswerValue(questionId);
    const scaleValues = [0, 25, 50, 75, 100];
    const scaleLabels = getScaleLabels(questionId);

    return (
      <View className="mt-3 mb-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-gray-600 text-sm font-medium">
            {scaleLabels.left}
          </Text>
          <Text className="text-gray-600 text-sm font-medium">
            {scaleLabels.right}
          </Text>
        </View>

        <View className="flex-row justify-between items-center px-2">
          {scaleValues.map((value, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAnswerChange(questionId, value)}
              className="items-center"
            >
              <View
                className={`w-8 h-8 rounded-full border-2 ${
                  currentValue === value
                    ? "bg-primary border-primary"
                    : "bg-white border-gray-300"
                }`}
              >
                {currentValue === value && (
                  <View className="flex-1 items-center justify-center">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {currentValue !== null && (
          <Text
            className={`text-center ${getScaleColor(
              currentValue
            )} font-semibold mt-6`}
          >
            {getScaleLabel(currentValue, questionId)}
          </Text>
        )}
      </View>
    );
  };

  const renderProgressDots = () => {
    return (
      <View className="flex-row justify-center items-center py-4">
        {questions.map((_, index) => {
          const canNavigate = canNavigateToCategory(index);
          const isCompleted =
            index < currentCategory ||
            (index === currentCategory &&
              questions[index].items.every(
                (q) => getAnswerValue(q.id) !== null
              ));

          return (
            <TouchableOpacity
              key={index}
              onPress={() => (canNavigate ? setCurrentCategory(index) : null)}
              className="mx-1"
              disabled={!canNavigate}
            >
              <View
                className={`w-10 h-3 rounded-full ${
                  index === currentCategory
                    ? "bg-primary"
                    : isCompleted
                    ? "bg-greenLight"
                    : canNavigate
                    ? "bg-gray-400"
                    : "bg-gray-200"
                }`}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderHomeScreen = () => (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="flex-1 px-6">
        <ImageBackground
          source={require("@/assets/images/banner-background.png")}
          style={{ flex: 1, paddingVertical: 64 }}
          resizeMode="stretch"
        >
          <View className="absolute inset-0 bg-primary/60" />
          <View className="items-start mb-8">
            <View className="bg-green-100 p-4 rounded-full mb-4">
              <Ionicons name="document-text" size={32} color={colors.primary} />
            </View>
            <Text className="text-3xl font-bold text-white text-center mb-2">
              Formulário Mensal NR-1
            </Text>
            <Text className="text-white text-center text-lg">
              Avaliação de Fatores Psicossociais
            </Text>
          </View>

          <View className="bg-white rounded-xl p-6 mb-8 shadow-sm">
            <Text className="text-gray-800 text-base leading-6 text-justify">
              <Text className="font-semibold">Prezado(a) colaborador(a),</Text>
              {"\n\n"}
              Este questionário é uma ferramenta científica validada para
              avaliar fatores psicossociais no ambiente de trabalho. Suas
              respostas serão utilizadas de forma confidencial para fins de
              prevenção e gestão de riscos ocupacionais, conforme a NR-1.
            </Text>
          </View>

          {isFormAvailable ? (
            <TouchableOpacity
              onPress={() => setCurrentScreen("questionnaire")}
              className="bg-greenLight rounded-xl py-4 px-6 mb-8"
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="play-circle" size={24} color="black" />
                <Text className="text-black font-bold text-lg ml-3">
                  Iniciar Formulário NR-1
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View className="bg-orange-100 border border-orange-200 rounded-xl p-6 mb-8">
              <View className="flex-row items-center mb-3">
                <Ionicons name="time" size={24} color="#ea580c" />
                <Text className="text-orange-800 font-semibold text-lg ml-3">
                  Formulário Indisponível
                </Text>
              </View>
              <Text className="text-orange-700 text-base leading-6">
                O formulário será liberado no último dia útil do mês. Você será
                notificado quando estiver disponível para preenchimento.
              </Text>
            </View>
          )}

          <View className="bg-gray-100 rounded-xl p-6">
            <Text className="text-gray-800 font-semibold text-lg mb-4 text-center">
              Precisa relatar algum abuso?
            </Text>
            <Text className="text-gray-600 text-center mb-6">
              Se você sofreu ou presenciou alguma situação inadequada, pode
              relatar de forma anônima e segura.
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowReportModal(true)}
              className="bg-red-500 rounded-xl py-3 px-6"
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="shield" size={20} color="white" />
                <Text className="text-white font-semibold text-base ml-3">
                  Fazer Denúncia Anônima
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );

  const renderQuestionnaireScreen = () => (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white shadow-sm">
        <View className="px-6 py-4 pt-16">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setCurrentScreen("home")}
            >
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-800">
              {questions[currentCategory].category}
            </Text>
            <Text className="text-gray-500 font-medium">
              {currentCategory + 1}/{questions.length}
            </Text>
          </View>
          {renderProgressDots()}
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        <View className="mb-6">
          {questions[currentCategory].items.map((question) => (
            <View
              key={question.id}
              className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-gray-100"
            >
              <Text className="text-gray-800 text-base font-medium mb-2">
                {question.text}
              </Text>
              {renderScale(question.id)}
            </View>
          ))}
        </View>

        <View className="flex-row justify-between mb-8">
          <Button
            title="Anterior"
            onPress={handlePreviousCategory}
            disabled={currentCategory === 0}
            variant="secondary"
            className={`flex-1 mr-2 py-3 px-6 rounded-xl`}
          />

          <Button
            title={
              currentCategory === questions.length - 1 ? "Finalizar" : "Próximo"
            }
            onPress={handleNextCategory}
            className="flex-1 ml-2 bg-primary py-3 px-6 rounded-xl"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const renderCompletedScreen = () => (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center px-6">
        <View className="bg-green-100 p-6 rounded-full mb-8">
          <Ionicons name="checkmark-circle" size={64} color="#16a34a" />
        </View>

        <Text className="text-3xl font-bold text-gray-800 text-center mb-4">
          Obrigado!
        </Text>

        <Text className="text-gray-600 text-center text-lg leading-7 mb-8">
          Seu formulário foi enviado com sucesso. Suas respostas são importantes
          para melhorarmos nosso ambiente de trabalho.
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setCurrentScreen("home");
            setCurrentCategory(0);
            setAnswers([]);
          }}
          className="bg-primary rounded-xl py-4 px-8"
        >
          <Text className="text-white font-bold text-lg">Voltar ao Início</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  const renderReportModal = () => (
    <Modal
      visible={showReportModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowReportModal(false)}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-6">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-2xl font-bold text-gray-800">
              Denúncia Anônima
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowReportModal(false)}
            >
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          <View className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <Text className="text-primary text-sm leading-5">
              Sua identidade será mantida em sigilo absoluto. Descreva a
              situação com o máximo de detalhes possível.
            </Text>
          </View>

          <TextInput
            value={reportText}
            onChangeText={setReportText}
            placeholder="Descreva detalhadamente o que aconteceu..."
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            className="bg-gray-50 rounded-xl p-4 text-gray-800 text-base mb-6"
            placeholderTextColor="#9ca3af"
          />

          <View className="flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowReportModal(false)}
              className="flex-1 bg-gray-200 py-3 rounded-xl"
            >
              <Text className="text-gray-700 text-center font-semibold">
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleReportSubmit}
              className="flex-1 bg-red-500 py-3 rounded-xl"
            >
              <Text className="text-white text-center font-semibold">
                Enviar Denúncia
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      {currentScreen === "home" && renderHomeScreen()}
      {currentScreen === "questionnaire" && renderQuestionnaireScreen()}
      {currentScreen === "completed" && renderCompletedScreen()}
      {renderReportModal()}
    </>
  );
};

export default FormularioNR1Screen;
