import { PHYSICAL_PAIN_QUESTIONS_CONFIG } from "@/constants/physicalPainQuestions";
import { useAuth } from "@/contexts/AuthContext";
import { PhysicalPainFormState } from "@/types/triagem";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from '../lib/supabase';
import { generatePainExerciseRecommendations } from '../lib/recommendationUtils';

const PAIN_MOTIVATIONAL_MESSAGES = [
  'Cada movimento é um passo para o bem-estar!',
  'Você está no caminho certo para uma vida sem dor!',
  'Pequenos exercícios fazem uma grande diferença!',
  'Sua jornada de recuperação começa agora!',
  'O movimento é o melhor remédio para o corpo!',
  'Cada dia de exercício é um investimento na sua saúde!',
  'Você é mais forte do que qualquer dor!'
];

const PAIN_GENERIC_DIAGNOSTICS = [
  'Com base na sua avaliação, identificamos exercícios personalizados para seu bem-estar físico.',
  'Exercícios de fortalecimento e alongamento podem ajudar significativamente no alívio da dor.',
  'A prática regular de exercícios terapêuticos é fundamental para a recuperação.',
  'Movimentos controlados e progressivos fortalecem a musculatura e reduzem o desconforto.',
  'Exercícios específicos para sua condição podem melhorar a mobilidade e qualidade de vida.',
  'A combinação de fortalecimento e flexibilidade é essencial para o tratamento da dor.'
];

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

  const generateGenericPainResponse = () => {
    const randomMotivational = PAIN_MOTIVATIONAL_MESSAGES[
      Math.floor(Math.random() * PAIN_MOTIVATIONAL_MESSAGES.length)
    ];

    const randomDiagnostic = PAIN_GENERIC_DIAGNOSTICS[
      Math.floor(Math.random() * PAIN_GENERIC_DIAGNOSTICS.length)
    ];

    return {
      output: {
        'Frase Motivacional': randomMotivational,
        'Diagnostico': randomDiagnostic
      }
    };
  };

  const submitFormData = async () => {
    try {
      setIsLoading(true);

      let triagemId;

      if (user?.id) {
        try {
          const { data: triagemData, error: triagemError } = await supabase
            .from('triagens')
            .insert({
              user_id: user.id,
              type: 'pain',
              status: 'completed'
            })
            .select()
            .single();

          if (triagemError) throw triagemError;

          const { error: symptomsError } = await supabase
            .from('pain_symptoms')
            .insert({
              triagem_id: triagemData.id,
              dor_com_mais_freq: formState.dorComMaisFreq,
              dor_aparece_em_qual_situacao: formState.dorApareceEmQualSituacao,
              tipo_de_dor: formState.tipoDeDor,
              quando_dor_comecou: formState.quandoDorComecou,
              nivel_de_dor: formState.nivelDeDor,
              como_afeta_minha_vida: formState.comoAfetaMinhaVida,
              o_que_gostaria_de_alcancar_com_alivio: formState.oQueGostariaDeAlcançarComAlivio
            });

          if (symptomsError) throw symptomsError;

          console.log('Pain symptoms data persisted successfully');
          triagemId = triagemData.id;

          try {
            const recommendedExercises = await generatePainExerciseRecommendations(
              triagemData.id,
              user.id,
              formState.dorComMaisFreq,
              formState.nivelDeDor
            );

            console.log(`Generated ${recommendedExercises.length} exercise recommendations`);
          } catch (recError) {
            console.error('Error generating exercise recommendations:', recError);
          }
        } catch (dbError) {
          console.error('Error persisting pain symptoms data:', dbError);
        }
      }

      const genericResponse = generateGenericPainResponse();
      const responseString = JSON.stringify(genericResponse);
      setResponse(responseString);

      console.log("Generated generic pain response:", responseString);

      router.push({
        pathname: "/diagnostic-ideal",
        params: {
          type: "pain",
          triagemId: triagemId || undefined,
          ...formState,
          apiResponse: responseString,
        },
      });
    } catch (error) {
      console.error("Error processing pain data:", error);
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
