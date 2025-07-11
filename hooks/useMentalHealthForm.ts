import { MentalPainFormState, Question } from '@/types/triagem';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { QUESTIONS_CONFIG } from '../constants/mentalHealthQuestions';
import { useAuth } from '../contexts/AuthContext';
import { generateMentalHealthExerciseRecommendations } from '../lib/recommendationUtils';
import { supabase } from '../lib/supabase';

const MOTIVATIONAL_MESSAGES = [
  'Cada passo é uma conquista para seu bem-estar!',
  'Cuidar da mente é tão importante quanto cuidar do corpo!',
  'Você está no caminho certo para uma vida mais equilibrada!',
  'Pequenos momentos de autocuidado fazem toda a diferença!',
  'Sua jornada de bem-estar começa agora!',
  'Respire fundo, você é mais forte do que imagina!',
  'O equilíbrio mental é a base para uma vida plena!'
];

const GENERIC_DIAGNOSTICS = [
  'Com base na sua avaliação, selecionamos práticas personalizadas para seu bem-estar mental.',
  'Práticas de respiração e meditação podem ajudar a acalmar a mente e reduzir o estresse.',
  'Exercícios de mindfulness e relaxamento são fundamentais para o equilíbrio emocional.',
  'Técnicas de respiração consciente podem trazer mais tranquilidade ao seu dia a dia.',
  'Momentos de pausa e reflexão são essenciais para a saúde mental.',
  'A prática regular de exercícios mentais fortalece sua resiliência emocional.'
];

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

  const generateGenericResponse = () => {
    const randomMotivational = MOTIVATIONAL_MESSAGES[
      Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)
    ];

    const randomDiagnostic = GENERIC_DIAGNOSTICS[
      Math.floor(Math.random() * GENERIC_DIAGNOSTICS.length)
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
          const { data: existingTriagem, error: checkError } = await supabase
            .from('mental_health_symptoms')
            .select('triagem_id, triagens(*)')
            .eq('como_esta_sentindo', formState.comoEstaSentindo)
            .eq('frequencia_sentimento', formState.frequenciaSentimento)
            .eq('dificuldade_frequente', formState.dificuldadeFrequente)
            .eq('impacto_rotina', formState.impactoRotina)
            .eq('buscou_ajuda', formState.buscouAjuda)
            .eq('objetivo_alivio', formState.objetivoAlivio)
            .eq('triagens.user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1);

          if (checkError) throw checkError;

          let triagemData;

          if (existingTriagem && existingTriagem.length > 0) {
            triagemData = existingTriagem[0].triagens;
            console.log('Using existing triagem:', triagemData);
          } else {
            // Criar nova triagem
            const { data: newTriagem, error: triagemError } = await supabase
              .from('triagens')
              .insert({
                user_id: user.id,
                type: 'mental',
                status: 'completed'
              })
              .select()
              .single();

            if (triagemError) throw triagemError;

            // Salvar sintomas
            const { error: symptomsError } = await supabase
              .from('mental_health_symptoms')
              .insert({
                triagem_id: newTriagem.id,
                como_esta_sentindo: formState.comoEstaSentindo,
                frequencia_sentimento: formState.frequenciaSentimento,
                dificuldade_frequente: formState.dificuldadeFrequente,
                impacto_rotina: formState.impactoRotina,
                buscou_ajuda: formState.buscouAjuda,
                objetivo_alivio: formState.objetivoAlivio
              });

            if (symptomsError) throw symptomsError;

            triagemData = newTriagem;
            console.log('Mental health symptoms data persisted successfully');
          }

          triagemId = triagemData.id;

          try {
            const recommendedExercises = await generateMentalHealthExerciseRecommendations(
              triagemData.id,
              user.id,
              formState.comoEstaSentindo,
              formState.impactoRotina
            );

            console.log(`Generated ${recommendedExercises.length} exercise recommendations`);
          } catch (recError) {
            console.error('Error generating exercise recommendations:', recError);
          }
        } catch (dbError) {
          console.error('Error persisting mental health symptoms data:', dbError);
        }
      }

      // Gerar resposta genérica aleatória
      const genericResponse = generateGenericResponse();
      const responseString = JSON.stringify(genericResponse);
      setResponse(responseString);

      console.log("Generated generic response:", responseString);

      // Navegar para a tela de diagnóstico
      router.push({
        pathname: "/(tabs)/(triagem)/diagnostic-ideal",
        params: {
          type: "mental",
          triagemId: triagemId || undefined,
          ...formState,
          apiResponse: responseString,
        },
      });
    } catch (error) {
      console.error("Error processing mental health data:", error);
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
