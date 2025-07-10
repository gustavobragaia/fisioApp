import { MentalPainFormState, Question } from '@/types/triagem';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import handleMentalHealthSymptomsToN8n from '../api/handleMentalHealthSymptomsToN8n';
import { handleMentalHealthSubmission } from '../components/MentalHealthHandler';
import { QUESTIONS_CONFIG } from '../constants/mentalHealthQuestions';
import { useAuth } from '../contexts/AuthContext';

export const useMentalHealthForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams();

  const [formState, setFormState] = useState<MentalPainFormState>({
    comoEstaSentindo: "",
    frequenciaSentimento: "",
    dificuldadeFrequente: "",
    impactoRotina: "",
    buscouAjuda: "",
    objetivoAlivio: "",
  });

  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      if (params.preSelectedQuestion) {
        const feelingValue = params.preSelectedQuestion as string;

        const validFeelings = QUESTIONS_CONFIG[0].options.map(option => option.value);
        if (validFeelings.includes(feelingValue)) {
          setFormState(prev => ({
            ...prev,
            comoEstaSentindo: feelingValue,
          }));
          setCurrentScreen(1);
        }
      }
      setIsInitialized(true);
    }
  }, [params.preSelectedQuestion, isInitialized]);

  const updateFormState = (key: keyof MentalPainFormState, value: string) => {
    setFormState(prev => ({ ...prev, [key]: value }));
  };

  const questions: Question[] = QUESTIONS_CONFIG.map(config => ({
    question: config.question,
    state: formState[config.key],
    setState: (value: string) => updateFormState(config.key, value),
    options: config.options,
  }));

  const goToNextScreen = () => {
    if (currentScreen < questions.length) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const goToPreviousScreen = () => {
    if (currentScreen === 1 && params.preSelectedQuestion) {
      router.back();
      return;
    }

    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const submitFormData = async () => {
    try {
      setIsLoading(true);

      const webhookResponse = await handleMentalHealthSymptomsToN8n(
        formState.comoEstaSentindo,
        formState.frequenciaSentimento,
        formState.dificuldadeFrequente,
        formState.impactoRotina,
        formState.buscouAjuda,
        formState.objetivoAlivio,
        user || undefined
      );

      setResponse(webhookResponse);
      console.log("Webhook response:", webhookResponse);

      const supabaseResult = await handleMentalHealthSubmission({
        ...formState,
        onSuccess: (triagemId) => {
          console.log("Mental health data saved to Supabase with triagem ID:", triagemId);
        },
        onError: (error) => {
          console.error("Error saving to Supabase:", error);
        },
      });

      router.push({
        pathname: "/(tabs)/(triagem)/diagnostic-ideal",
        params: {
          type: "mental",
          triagemId: supabaseResult.success ? supabaseResult.triagemId : undefined,
          ...formState,
          apiResponse: webhookResponse,
        },
      });
    } catch (error) {
      console.error("Error sending mental health data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormState({
      comoEstaSentindo: "",
      frequenciaSentimento: "",
      dificuldadeFrequente: "",
      impactoRotina: "",
      buscouAjuda: "",
      objetivoAlivio: "",
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
