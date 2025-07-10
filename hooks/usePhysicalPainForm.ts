import handlePainSendSymptomsToN8n from "@/api/handlePainSendSymptomsToN8n";
import { PHYSICAL_PAIN_QUESTIONS_CONFIG } from "@/constants/physicalPainQuestions";
import { useAuth } from "@/contexts/AuthContext";
import { PhysicalPainFormState } from "@/types/triagem";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export const usePhysicalPainForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams();

  const [formState, setFormState] = useState<PhysicalPainFormState>({
    dorComMaisFreq: "",
    dorApareceEmQualSituacao: "",
    tipoDeDor: "",
    quandoDorComecou: "",
    nivelDeDor: "",
    comoAfetaMinhaVida: "",
    oQueGostariaDeAlcançarComAlivio: "",
  });

  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      if (params.preSelectedQuestion) {
        const painValue = params.preSelectedQuestion as string;
        const validValues = PHYSICAL_PAIN_QUESTIONS_CONFIG[0].options.map(opt => opt.value);
        if (validValues.includes(painValue)) {
          setFormState(prev => ({
            ...prev,
            dorComMaisFreq: painValue,
          }));
          setCurrentScreen(1);
        }
      }
      setIsInitialized(true);
    }
  }, [params.preSelectedQuestion, isInitialized]);

  const updateFormState = (key: keyof PhysicalPainFormState, value: string) => {
    setFormState(prev => ({ ...prev, [key]: value }));
  };

  const questions = PHYSICAL_PAIN_QUESTIONS_CONFIG.map(config => ({
    question: config.question,
    state: formState[config.key as keyof PhysicalPainFormState],
    setState: (value: string) => updateFormState(config.key as keyof PhysicalPainFormState, value),
    options: config.options,
  }));

  const goToNextScreen = () => {
    if (currentScreen < questions.length) setCurrentScreen(currentScreen + 1);
  };

  const goToPreviousScreen = () => {
    if (currentScreen === 1 && params.preSelectedQuestion) {
      router.back();
      return;
    }
    if (currentScreen > 0) setCurrentScreen(currentScreen - 1);
  };

  const submitFormData = async () => {
    try {
      setIsLoading(true);
      const webhookResponse = await handlePainSendSymptomsToN8n(
        formState.dorComMaisFreq,
        formState.dorApareceEmQualSituacao,
        formState.tipoDeDor,
        formState.quandoDorComecou,
        formState.nivelDeDor,
        formState.comoAfetaMinhaVida,
        formState.oQueGostariaDeAlcançarComAlivio,
        user || undefined
      );
      setResponse(webhookResponse);

      router.push({
        pathname: "/diagnostic-ideal",
        params: {
          ...formState,
          apiResponse: webhookResponse,
        },
      });
    } catch (error) {
      console.error("Error sending pain data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormState({
      dorComMaisFreq: "",
      dorApareceEmQualSituacao: "",
      tipoDeDor: "",
      quandoDorComecou: "",
      nivelDeDor: "",
      comoAfetaMinhaVida: "",
      oQueGostariaDeAlcançarComAlivio: "",
    });
    setResponse("");
    setCurrentScreen(0);
    setIsLoading(false);
    setIsInitialized(false);
  };

  return {
    formState,
    questions,
    currentScreen,
    isLoading,
    response,
    goToNextScreen,
    goToPreviousScreen,
    submitFormData,
    resetForm,
    haspreSelectedQuestion: !!params.preSelectedQuestion,
  };
};
