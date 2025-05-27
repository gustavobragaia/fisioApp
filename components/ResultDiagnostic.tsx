import React from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';

type DiagnosticParams = {
  dorComMaisFreq: string;
  dorApareceEmQualSituacao: string;
  tipoDeDor: string;
  quandoDorComecou: string;
  nivelDeDor: string;
  comoAfetaMinhaVida: string;
  oQueGostariaDeAlcancarComAlivio: string;
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


export default function ResultDiagnostic() {
  // Get the params from the route and router for navigation
  const params = useLocalSearchParams<DiagnosticParams>();
  const router = useRouter();
  
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
  const fraseMotivacional = parsedResponse?.output?.["Frase Motivacional"] || 'Cada movimento é um passo para o bem-estar!';
  const diagnostico = parsedResponse?.output?.Diagnostico || 'Diagnóstico não disponível';
  
  // Mock exercises if not provided in the API response
  const exercicios = parsedResponse?.output?.Exercicios || [
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
    {
      nome: 'Alívio de Dor',
      descricao: 'Exercícios para aliviar dores agudas e crônicas',
      tipo: 'alivio',
      imageUrl: 'https://via.placeholder.com/150'
    }
  ];
  
  // Get exercise type class for NativeWind
  const getExerciseTypeClass = (tipo: string) => {
    const typeClasses: Record<string, {bg: string, text: string}> = {
      'alongamento': {bg: 'bg-[#CDEFE8]', text: 'text-textPrimary'},
      'fortalecimento': {bg: 'bg-[#aee1f969]', text: 'text-deepBlue'},
      'aquecimento': {bg: 'bg-[#AEE1F9]', text: 'text-textPrimary'},
      'alivio': {bg: 'bg-[#F4F1EE]', text: 'text-textPrimary'},
    };
    
    return typeClasses[tipo] || {bg: 'bg-[#F4F1EE]', text: 'text-textPrimary'};
  };

  // Mock exercises for each category
  const mockExercisesForCategory = (categoryType: string) => {
    // This would typically come from your API
    return [
      {
        id: '1',
        name: `${categoryType} - Exercício 1`,
        description: 'Descrição do exercício 1',
        imageUrl: 'https://via.placeholder.com/150',
        steps: ['Passo 1', 'Passo 2', 'Passo 3'],
        duration: '2 minutos',
        difficulty: 'fácil'
      },
      {
        id: '2',
        name: `${categoryType} - Exercício 2`,
        description: 'Descrição do exercício 2',
        imageUrl: 'https://via.placeholder.com/150',
        steps: ['Passo 1', 'Passo 2', 'Passo 3'],
        duration: '3 minutos',
        difficulty: 'médio'
      },
      {
        id: '3',
        name: `${categoryType} - Exercício 3`,
        description: 'Descrição do exercício 3',
        imageUrl: 'https://via.placeholder.com/150',
        steps: ['Passo 1', 'Passo 2', 'Passo 3'],
        duration: '4 minutos',
        difficulty: 'difícil'
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
            pathname: '/exercise-group',
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
        <View className="h-40 bg-[#CDEFE8] rounded-xl mb-6 items-center justify-center">
          <Image 
            source={require('../assets/images/favicon.png')} 
            className="w-20 h-20"
            resizeMode="contain"
          />
        </View>
        
        {/* Personalized Message */}
        <Text className="text-xl font-bold text-deepBlue mb-2">
          Gustavo, separei esse treino personalizado para você!
        </Text>
        
        {/* Diagnostic */}
        <View className="bg-white p-2 rounded-lg mb-6">
          <Text className="text-textPrimary">{diagnostico}</Text>
        </View>
        
        {/* Exercise List */}
        <Text className="text-xl font-bold text-deepBlue mb-4">Exercícios Recomendados</Text>
        <FlatList
          data={exercicios}
          renderItem={renderExerciseItem}
          keyExtractor={(item, index) => `exercise-${index}`}
          scrollEnabled={false} // Disable scrolling as we're inside a ScrollView
        />
      </ScrollView>
    </SafeAreaView>
  );
}