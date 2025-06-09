import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import colors from '../styles/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

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
    "Diagnostico": string;
    "Exercicios": Array<{
      nome: string;
      descricao: string;
      tipo: string;
      imageUrl?: string;
    }>;
  }
};

type ResultDiagnosticProps = {
  type?: 'pain' | 'mental';
};


function ResultDiagnostic({ type = 'pain' }: ResultDiagnosticProps) {
  // Get the params from the route and router for navigation
  const params = useLocalSearchParams<PainDiagnosticParams & MentalHealthParams>();
  const router = useRouter();
  
  // State for storing actual exercises from database
  const [actualExercises, setActualExercises] = useState<Record<string, any[]>>({});
  const [exerciseCategories, setExerciseCategories] = useState<any[]>([]);
  const [loadingExercises, setLoadingExercises] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [triagemId, setTriagemId] = useState<string | null>(null);
  
  // Parse the API response
  const parseApiResponse = () => {
    try {
      if (!params.apiResponse) return null;
      
      return typeof params.apiResponse === 'string'
        ? JSON.parse(params.apiResponse)[0]
        : params.apiResponse;
    } catch (error) {
      console.error('Error parsing API response:', error);
      return null;
    }
  };
  
  const parsedResponse = parseApiResponse();
  const fraseMotivacional = parsedResponse?.output?.["Frase Motivacional"] || 
    (type === 'pain' ? 'Cada movimento é um passo para o bem-estar!' : 'Cuidar da mente é tão importante quanto cuidar do corpo!');
  
  const diagnostico = parsedResponse?.output?.Diagnostico || 
    (type === 'pain' 
      ? 'Diagnóstico não disponível' 
      : 'Com base na sua avaliação, identificamos que você pode se beneficiar de exercícios para reduzir ansiedade e melhorar a qualidade do sono. Práticas de respiração e meditação podem ajudar a acalmar a mente e preparar o corpo para um descanso melhor.');
  
  // Mock exercises if not provided in the API response based on type
  const painExercises = [
    {
      nome: 'Alívio de Dor',
      descricao: 'Exercícios para aliviar dores agudas e crônicas',
      tipo: 'alivio',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      nome: 'Alongamento Matinal',
      descricao: 'Série de alongamentos para iniciar o dia com mais disposição',
      tipo: 'alongamento',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      nome: 'Fortalecimento Lombar',
      descricao: 'Exercícios para fortalecer a região lombar e prevenir dores',
      tipo: 'fortalecimento',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      nome: 'Aquecimento Pré-treino',
      descricao: 'Prepare seu corpo antes de atividades físicas intensas',
      tipo: 'aquecimento',
      imageUrl: 'https://via.placeholder.com/150'
    },
  ];

  const mentalExercises = [
    {
      nome: 'Meditação Guiada',
      descricao: 'Exercícios de meditação para acalmar a mente e reduzir ansiedade',
      tipo: 'meditacao',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      nome: 'Técnicas de Respiração',
      descricao: 'Práticas de respiração para momentos de estresse e ansiedade',
      tipo: 'respiracao',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      nome: 'Relaxamento Muscular',
      descricao: 'Sequência de relaxamento para aliviar tensão física causada por estresse',
      tipo: 'relaxamento',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      nome: 'Rotina para Dormir Melhor',
      descricao: 'Práticas para melhorar a qualidade do sono e combater a insônia',
      tipo: 'sono',
      imageUrl: 'https://via.placeholder.com/150'
    },
  ];
  
  // Use exercise categories from database if available, otherwise fall back to mock data
  const exercicios = exerciseCategories.length > 0 ? 
    exerciseCategories : 
    (parsedResponse?.output?.Exercicios || (type === 'pain' ? painExercises : mentalExercises));
  
  // Get exercise type class for NativeWind
  const getExerciseTypeClass = (tipo: string) => {
    const painClasses: Record<string, {bg: string, text: string}> = {
      'alongamento': {bg: 'bg-[#CDEFE8]', text: 'text-textPrimary'},
      'fortalecimento': {bg: 'bg-[#aee1f969]', text: 'text-deepBlue'},
      'aquecimento': {bg: 'bg-[#AEE1F9]', text: 'text-textPrimary'},
      'alivio': {bg: 'bg-[#F4F1EE]', text: 'text-textPrimary'},
    };
    
    const mentalClasses: Record<string, {bg: string, text: string}> = {
      'meditacao': {bg: 'bg-[#8E9BFF40]', text: 'text-textPrimary'},
      'respiracao': {bg: 'bg-[#aee1f969]', text: 'text-deepBlue'},
      'relaxamento': {bg: 'bg-[#CDEFE8]', text: 'text-textPrimary'},
      'sono': {bg: 'bg-[#F4F1EE]', text: 'text-textPrimary'},
    };
    
    const typeClasses = type === 'pain' ? painClasses : mentalClasses;
    return typeClasses[tipo] || {bg: 'bg-[#F4F1EE]', text: 'text-textPrimary'};
  };

  // Fetch user exercises from the database
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoadingExercises(false);
          return;
        }
        
        setUserId(user.id);
        
        // Get the latest triagem for this user
        const { data: triagens, error: triagemError } = await supabase
          .from('triagens')
          .select('id')
          .eq('user_id', user.id)
          .eq('type', type)
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (triagemError || !triagens || triagens.length === 0) {
          console.error('Error fetching triagem:', triagemError);
          setLoadingExercises(false);
          return;
        }
        
        const latestTriagemId = triagens[0].id;
        setTriagemId(latestTriagemId);
        
        // Get user exercises for this triagem
        const { data: userExercises, error: userExercisesError } = await supabase
          .from('user_exercises')
          .select('exercise_id')
          .eq('user_id', user.id)
          .eq('triagem_id', latestTriagemId);
        
        if (userExercisesError) {
          console.error('Error fetching user exercises:', userExercisesError);
          setLoadingExercises(false);
          return;
        }
        
        if (!userExercises || userExercises.length === 0) {
          console.log('No exercises found for this triagem');
          setLoadingExercises(false);
          return;
        }
        
        // Get the actual exercises
        const exerciseIds = userExercises.map(ue => ue.exercise_id);
        const { data: exercises, error: exercisesError } = await supabase
          .from('exercises')
          .select('*')
          .in('id', exerciseIds);
        
        if (exercisesError) {
          console.error('Error fetching exercises:', exercisesError);
          setLoadingExercises(false);
          return;
        }
        
        // Group exercises by group_type
        const groupedExercises: Record<string, any[]> = {};
        exercises?.forEach(exercise => {
          const groupType = exercise.group_type;
          if (!groupedExercises[groupType]) {
            groupedExercises[groupType] = [];
          }
          groupedExercises[groupType].push(exercise);
        });
        
        // Create exercise category items from the grouped exercises
        const exerciseCategories = Object.keys(groupedExercises).map(groupType => {
          const exercisesInGroup = groupedExercises[groupType];
          return {
            nome: getGroupTypeName(groupType),
            descricao: `${exercisesInGroup.length} exercício(s) recomendado(s)`,
            tipo: groupType,
            imageUrl: 'https://via.placeholder.com/150'
          };
        });
        
        // If we have exercise categories, use them instead of mock data
        if (exerciseCategories.length > 0) {
          setExerciseCategories(exerciseCategories);
        }
        
        setActualExercises(groupedExercises);
        setLoadingExercises(false);
      } catch (error) {
        console.error('Error in fetchUserData:', error);
        setLoadingExercises(false);
      }
    };
    
    fetchUserData();
  }, [type]);
  
  // Helper function to get a friendly name for group types
  const getGroupTypeName = (groupType: string): string => {
    const groupTypeNames: Record<string, string> = {
      'Alívio imediato da dor': 'Alívio de Dor',
      'Alongamento': 'Alongamento',
      'Aquecimento': 'Aquecimento',
      'Fortalecimento muscular': 'Fortalecimento',
      'Ansioso(a)': 'Exercícios para Ansiedade',
      'Estressado(a)': 'Alívio de Estresse',
      'Com dificuldade para dormir': 'Melhoria do Sono',
      'Triste ou desanimado(a)': 'Elevação do Humor',
      'Irritado(a)': 'Controle da Irritabilidade',
      'Quero manter meu bem-estar': 'Bem-estar Geral'
    };
    
    return groupTypeNames[groupType] || groupType;
  };
  
  // Get exercises for a specific category - use actual data if available, fallback to mock
  const getExercisesForCategory = (categoryType: string) => {
    // If we have actual exercises for this category, use them
    if (actualExercises[categoryType] && actualExercises[categoryType].length > 0) {
      return actualExercises[categoryType].map(ex => {
        // Parse steps if it's a string (JSONB from database)
        let parsedSteps = [];
        try {
          if (Array.isArray(ex.steps)) {
            // Keep steps as objects if they are objects
            parsedSteps = ex.steps;
          } else if (typeof ex.steps === 'string') {
            const parsed = JSON.parse(ex.steps);
            if (Array.isArray(parsed)) {
              parsedSteps = parsed;
            } else {
              // If it's an object but not an array, convert to array
              parsedSteps = Object.values(parsed);
            }
          } else if (ex.steps && typeof ex.steps === 'object') {
            // Handle case where steps might already be parsed as object
            parsedSteps = Object.values(ex.steps);
          }
        } catch (error) {
          console.error('Error parsing exercise steps:', error);
          parsedSteps = [];
        }
        
        return {
          id: ex.id,
          name: ex.name,
          description: ex.description,
          imageUrl: ex.thumbnail_url || 'https://via.placeholder.com/150',
          videoUrl: ex.video_url,
          steps: parsedSteps,
          duration: `${ex.duration || 30} segundos`,
          difficulty: ex.difficulty
        };
      });
    }
    
    // Otherwise fall back to mock data
    // Mental health specific exercises
    const mentalExercisesByType: Record<string, any[]> = {
      'meditacao': [
        {
          id: '1',
          name: 'Meditação de Atenção Plena',
          description: 'Foque sua atenção na respiração e nos pensamentos presentes',
          imageUrl: 'https://via.placeholder.com/150',
          steps: ['Sente-se confortavelmente', 'Feche os olhos e respire profundamente', 'Observe seus pensamentos sem julgá-los'],
          duration: '10 minutos',
          difficulty: 'fácil'
        },
        {
          id: '2',
          name: 'Meditação para Ansiedade',
          description: 'Técnica específica para momentos de ansiedade',
          imageUrl: 'https://via.placeholder.com/150',
          steps: ['Encontre um local tranquilo', 'Respire contando até 4', 'Segure por 2 segundos', 'Expire contando até 6'],
          duration: '5 minutos',
          difficulty: 'médio'
        }
      ],
      'respiracao': [
        {
          id: '1',
          name: 'Respiração 4-7-8',
          description: 'Técnica de respiração para acalmar o sistema nervoso',
          imageUrl: 'https://via.placeholder.com/150',
          steps: ['Inspire pelo nariz contando até 4', 'Segure a respiração contando até 7', 'Expire pela boca contando até 8'],
          duration: '3 minutos',
          difficulty: 'fácil'
        },
        {
          id: '2',
          name: 'Respiração Diafragmática',
          description: 'Respiração profunda usando o diafragma',
          imageUrl: 'https://via.placeholder.com/150',
          steps: ['Deite-se confortavelmente', 'Coloque uma mão no peito e outra no abdômen', 'Respire profundamente pelo nariz, expandindo o abdômen'],
          duration: '5 minutos',
          difficulty: 'médio'
        }
      ],
      'relaxamento': [
        {
          id: '1',
          name: 'Relaxamento Muscular Progressivo',
          description: 'Tensione e relaxe grupos musculares para aliviar tensão',
          imageUrl: 'https://via.placeholder.com/150',
          steps: ['Comece pelos pés, tensionando por 5 segundos', 'Relaxe completamente', 'Avance para as pernas e continue pelo corpo'],
          duration: '15 minutos',
          difficulty: 'médio'
        }
      ],
      'sono': [
        {
          id: '1',
          name: 'Rotina de Relaxamento Noturno',
          description: 'Sequência de atividades para preparar o corpo para dormir',
          imageUrl: 'https://via.placeholder.com/150',
          steps: ['Desligue eletrônicos 1h antes de dormir', 'Tome um banho morno', 'Pratique respiração lenta por 5 minutos'],
          duration: '30 minutos',
          difficulty: 'fácil'
        },
        {
          id: '2',
          name: 'Meditação para Dormir',
          description: 'Meditação guiada para induzir o sono',
          imageUrl: 'https://via.placeholder.com/150',
          steps: ['Deite-se na cama', 'Respire profundamente', 'Visualize um local tranquilo e seguro'],
          duration: '10 minutos',
          difficulty: 'fácil'
        }
      ]
    };
    
    // Pain specific exercises
    const painExercisesByType: Record<string, any[]> = {
      'alongamento': [
        {
          id: '1',
          name: 'Alongamento de Coluna',
          description: 'Exercício para alongar a coluna e aliviar tensões',
          imageUrl: 'https://via.placeholder.com/150',
          steps: ['Sente-se com a coluna ereta', 'Incline lentamente para um lado', 'Mantenha por 15 segundos', 'Repita para o outro lado'],
          duration: '2 minutos',
          difficulty: 'fácil'
        }
      ],
      'fortalecimento': [
        {
          id: '1',
          name: 'Ponte para Lombar',
          description: 'Fortalecimento da região lombar e glúteos',
          imageUrl: 'https://via.placeholder.com/150',
          steps: ['Deite-se de costas', 'Dobre os joelhos com os pés apoiados', 'Eleve o quadril', 'Mantenha por 10 segundos'],
          duration: '3 minutos',
          difficulty: 'médio'
        }
      ],
      'aquecimento': [
        {
          id: '1',
          name: 'Mobilidade Articular',
          description: 'Aquecimento das principais articulações',
          imageUrl: 'https://via.placeholder.com/150',
          steps: ['Gire os punhos', 'Gire os tornozelos', 'Movimente os ombros em círculos'],
          duration: '1 minuto',
          difficulty: 'fácil'
        }
      ],
      'alivio': [
        {
          id: '1',
          name: 'Alívio de Tensão Cervical',
          description: 'Exercício para aliviar dores na região do pescoço',
          imageUrl: 'https://via.placeholder.com/150',
          steps: ['Incline a cabeça para um lado', 'Mantenha por 15 segundos', 'Repita para o outro lado'],
          duration: '2 minutos',
          difficulty: 'fácil'
        }
      ]
    };
    
    if (type === 'mental') {
      return mentalExercisesByType[categoryType] || [
        {
          id: '1',
          name: `${categoryType} - Exercício 1`,
          description: 'Descrição do exercício 1',
          imageUrl: 'https://via.placeholder.com/150',
          steps: ['Passo 1', 'Passo 2', 'Passo 3'],
          duration: '5 minutos',
          difficulty: 'fácil'
        }
      ];
    } else {
      return painExercisesByType[categoryType] || [
        {
          id: '1',
          name: `${categoryType} - Exercício 1`,
          description: 'Descrição do exercício 1',
          imageUrl: 'https://via.placeholder.com/150',
          steps: ['Passo 1', 'Passo 2', 'Passo 3'],
          duration: '2 minutos',
          difficulty: 'fácil'
        }
      ];
    }
  };

  // Render category-exercise item
  const renderExerciseItem = ({ item }: { item: any }) => {
    const typeClass = getExerciseTypeClass(item.tipo);
    
    return (
      
      <TouchableOpacity 
        className="bg-slate-50 p-4 rounded-lg shadow-sm mb-4"
        onPress={() => {
          // Navigate to exercise category screen with the category data
          const exercises = getExercisesForCategory(item.tipo);
          router.push({
            pathname: '/(tabs)/(triagem)/(exercises)/exercise-group',
            params: {
              categoryName: item.nome,
              categoryType: item.tipo,
              exercises: JSON.stringify(exercises),
              triagemId: triagemId || undefined
            }
          });
        }}
      >
        <View className="flex-row">
          {item.imageUrl && (
            <Image 
              source={{ uri: item.imageUrl }}
              className="w-20 h-20 rounded-lg mr-4"
            />
          )}
          <View className="flex-1">
            <View className="mb-2">
                <View className={`self-start px-2 py-1 rounded-full ${typeClass.bg} mb-1`}>
                  <Text className={`text-xs ${typeClass.text}`}>{item.tipo}</Text>
                </View>
                <Text className="text-lg font-bold text-deepBlue">{item.nome}</Text>
            </View>
            <Text className="text-textPrimary">{item.descricao}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">

        {/* App Logo */}
        <View className="items-center mb-6">
          <Image 
            source={require('../assets/images/favicon.png')} 
            className="w-20 h-20"
            resizeMode="contain"
          />
        </View>
        
        {/* Motivational Phrase */}
        <View className="items-center mb-6">
          <Text className="text-2xl font-bold text-textPrimary text-left">
            {fraseMotivacional}
          </Text>
        </View>
        
        {/* Personalized Message */}
        <Text className="text-xl font-bold text-deepBlue mb-2">
          {type === 'pain' 
            ? 'Gustavo, separei esse treino personalizado para você!' 
            : 'Separamos práticas para ajudar sua saúde mental!'}
        </Text>
        
        {/* Diagnostic */}
        <View className="bg-white p-2 rounded-lg mb-6">
          <Text className="text-textPrimary">{diagnostico}</Text>
        </View>
        
        {/* Exercise List */}
        <Text className="text-xl font-bold text-deepBlue mb-4">
          {type === 'pain' ? 'Exercícios Recomendados' : 'Práticas Recomendadas'}
        </Text>
        
        {loadingExercises ? (
          <View className="items-center py-8">
            <ActivityIndicator size="large" color={colors.light.deepBlue} />
            <Text className="text-textPrimary mt-2">Carregando exercícios...</Text>
          </View>
        ) : (
          <FlatList
            data={exercicios}
            renderItem={renderExerciseItem}
            keyExtractor={(item, index) => `exercise-${index}`}
            scrollEnabled={false} // Disable scrolling as we're inside a ScrollView
            ListEmptyComponent={
              <View className="items-center py-8">
                <Text className="text-textPrimary">Nenhum exercício encontrado</Text>
              </View>
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultDiagnostic;