import React from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';

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

export default function MentalHealthResult() {
  // Get the params from the route and router for navigation
  const params = useLocalSearchParams<MentalHealthParams>();
  const router = useRouter();
  
  // Parse the API response (if available)
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
  const fraseMotivacional = parsedResponse?.output?.["Frase Motivacional"] || 'Cuidar da mente é tão importante quanto cuidar do corpo!';
  const diagnostico = parsedResponse?.output?.Diagnostico || 'Com base na sua avaliação, identificamos que você pode se beneficiar de exercícios para reduzir ansiedade e melhorar a qualidade do sono. Práticas de respiração e meditação podem ajudar a acalmar a mente e preparar o corpo para um descanso melhor.';
  
  // Mental health exercises
  const exercicios = parsedResponse?.output?.Exercicios || [
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
  
  // Get exercise type class for NativeWind
  const getExerciseTypeClass = (tipo: string) => {
    const typeClasses: Record<string, {bg: string, text: string}> = {
      'meditacao': {bg: 'bg-[#8E9BFF40]', text: 'text-textPrimary'},
      'respiracao': {bg: 'bg-[#aee1f969]', text: 'text-deepBlue'},
      'relaxamento': {bg: 'bg-[#CDEFE8]', text: 'text-textPrimary'},
      'sono': {bg: 'bg-[#F4F1EE]', text: 'text-textPrimary'},
    };
    
    return typeClasses[tipo] || {bg: 'bg-[#F4F1EE]', text: 'text-textPrimary'};
  };

  // Mock exercises for each category
  const mockExercisesForCategory = (categoryType: string) => {
    // Mental health specific exercises
    const exercisesByType: Record<string, any[]> = {
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
    
    return exercisesByType[categoryType] || [
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
  };

  // Render category-exercise item
  const renderExerciseItem = ({ item }: { item: any }) => {
    const typeClass = getExerciseTypeClass(item.tipo);
    
    return (
      <TouchableOpacity 
        className="bg-slate-50 p-4 rounded-lg shadow-sm mb-4"
        onPress={() => {
          // Navigate to exercise category screen with the category data
          const exercises = mockExercisesForCategory(item.tipo);
          router.push({
            pathname: '/(tabs)/(triagem)/(exercises)/exercise-group',
            params: {
              categoryName: item.nome,
              categoryType: item.tipo,
              exercises: JSON.stringify(exercises)
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
        {/* Motivational Phrase */}
        <View className="items-center mb-6">
          <Text className="text-2xl font-bold text-textPrimary text-left">
            {fraseMotivacional}
          </Text>
        </View>
        
        {/* Image Space */}
        <View className="h-40 bg-[#8E9BFF40] rounded-xl mb-6 items-center justify-center">
          <Image 
            source={require('../assets/images/favicon.png')} 
            className="w-20 h-20"
            resizeMode="contain"
          />
        </View>
        
        {/* Personalized Message */}
        <Text className="text-xl font-bold text-deepBlue mb-2">
          Separamos práticas para ajudar sua saúde mental!
        </Text>
        
        {/* Diagnostic */}
        <View className="bg-white p-2 rounded-lg mb-6">
          <Text className="text-textPrimary">{diagnostico}</Text>
        </View>
        
        {/* Exercise List */}
        <Text className="text-xl font-bold text-deepBlue mb-4">Práticas Recomendadas</Text>
        <FlatList
          data={exercicios}
          renderItem={renderExerciseItem}
          keyExtractor={(item, index) => `${item.nome}-${index}`}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
