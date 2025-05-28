import { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../styles/colors';

// Types for our data
type TriagemItem = {
  id: string;
  date: string;
  type: string;
  location: string;
  progress: { completed: number, total: number };
  status: string;
};

type UserStats = {
  exercisesDone: number;
  triagemCount: number;
  consecutiveDays: number;
  lastTriagem?: string;
};

// First Access Dashboard Component
const FirstAccessDashboard = () => {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center p-6">
      <View className="bg-white rounded-2xl p-8 shadow-md w-full items-center">
        <Ionicons name="fitness-outline" size={80} color="#4F46E5" />
        <Text className="text-2xl font-bold text-center mt-4 text-gray-800">
          Bem-vindo ao FisioApp!
        </Text>
        <Text className="text-base text-center mt-2 mb-6 text-gray-600">
          Vamos começar sua jornada para uma vida mais saudável com uma avaliação inicial.
        </Text>
        <TouchableOpacity 
          className="bg-primary py-4 px-6 rounded-xl w-full" 
          onPress={() => router.push('/(tabs)/(triagem)/triagem')}
        >
          <Text className="text-white font-bold text-center text-lg">
            Começar Triagem
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Regular Dashboard Component
const RegularDashboard = ({ userStats, triagemHistory }: { userStats: UserStats, triagemHistory: TriagemItem[] }) => {
  const router = useRouter();
  
  // Current triagem with progress (first item in history)
  const currentTriagem = triagemHistory.length > 0 ? triagemHistory[0] : null;
  
  const renderTriagemHistoryItem = ({ item }: { item: TriagemItem }) => (
    <TouchableOpacity 
      className="bg-white rounded-xl p-4 mb-3 shadow-sm flex-row justify-between items-center"
      onPress={() => router.push({ pathname: '/(tabs)/(triagem)/diagnostic-ideal', params: { id: item.id } })}
    >
      <View>
        <Text className="font-bold text-gray-800">Triagem - {item.location}</Text>
        <Text className="text-gray-500 text-sm">{new Date(item.date).toLocaleDateString('pt-BR')}</Text>
      </View>
      <View className="flex-row items-center">
        <Text style={{ color: colors.light.deepBlue }} className="font-medium mr-2">{item.progress.completed}/{item.progress.total}</Text>
        <View style={{ backgroundColor: colors.light.deepBlue }} className="rounded-full w-8 h-8 items-center justify-center">
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* Header with Stats */}
      <View style={{ backgroundColor: colors.light.deepBlue }} className="rounded-3xl p-6 mb-6">
        <Text style={{ color: colors.textSecondary }} className="text-2xl font-bold mb-4">Olá, Usuário!</Text>
        
        <View className="flex-row justify-between mb-4">
          <View style={{ backgroundColor: colors.light.lightBlue }} className="rounded-xl p-3 items-center w-[30%]">
            <Text style={{ color: colors.textPrimary }} className="text-2xl font-bold">{userStats.exercisesDone}</Text>
            <Text style={{ color: colors.textPrimary }} className="text-xs">Exercícios</Text>
          </View>
          
          <View style={{ backgroundColor: colors.light.lightBlue }} className="rounded-xl p-3 items-center w-[30%]">
            <Text style={{ color: colors.textPrimary }} className="text-2xl font-bold">{userStats.triagemCount}</Text>
            <Text style={{ color: colors.textPrimary }} className="text-xs">Triagens</Text>
          </View>
          
          <View style={{ backgroundColor: colors.light.lightBlue }} className="rounded-xl p-3 items-center w-[30%]">
            <Text style={{ color: colors.textPrimary }} className="text-2xl font-bold">{userStats.consecutiveDays}</Text>
            <Text style={{ color: colors.textPrimary }} className="text-xs">Dias seguidos</Text>
          </View>
        </View>
        
        {/* New Screening Button */}
        <TouchableOpacity 
          style={{ backgroundColor: colors.background }}
          className="py-4 rounded-xl" 
          onPress={() => router.push('/(tabs)/(triagem)/triagem')}
        >
          <Text style={{ color: colors.light.deepBlue }} className="font-bold text-center">Começar Nova Triagem</Text>
        </TouchableOpacity>
      </View>

      {/* Current Progress Section */}
      {currentTriagem && (
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-3">Progresso Atual</Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row justify-between mb-1">
              <Text className="font-bold text-gray-800">Triagem - {currentTriagem.location}</Text>
              <Text className="text-gray-500">{new Date(currentTriagem.date).toLocaleDateString('pt-BR')}</Text>
            </View>
            
            {/* Progress Bar */}
            <View className="h-2 bg-gray-200 rounded-full mt-3 mb-2">
              <View 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${(currentTriagem.progress.completed / currentTriagem.progress.total) * 100}%`,
                  backgroundColor: colors.light.deepBlue 
                }} 
              />
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500 text-sm">{currentTriagem.progress.completed} de {currentTriagem.progress.total} exercícios concluídos</Text>
              <TouchableOpacity>
                <Text style={{ color: colors.light.deepBlue }} className="font-medium">Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* History Section */}
      <View className="flex-1 mb-6">
        <Text className="text-xl font-bold text-gray-800 mb-3">Histórico de Triagens</Text>
        
        {triagemHistory.length > 0 ? (
          <FlatList
            data={triagemHistory}
            renderItem={renderTriagemHistoryItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            nestedScrollEnabled={true}
          />
        ) : (
          <View className="bg-white rounded-xl p-6 items-center justify-center">
            <Text className="text-gray-500 text-center">Nenhuma triagem encontrada</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default function Dashboard() {
  // State to track if this is the user's first access
  const [isFirstAccess, setIsFirstAccess] = useState<boolean | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({ exercisesDone: 0, triagemCount: 0, consecutiveDays: 0 });
  const [triagemHistory, setTriagemHistory] = useState<TriagemItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from Supabase
    const fetchData = async () => {
      try {
        // This would be replaced with actual Supabase queries
        setTimeout(() => {
          // Mock data - in real app, this would come from Supabase
          const mockTriagemHistory = [
            { 
              id: '1', 
              date: '2025-05-28', 
              type: 'Triagem', 
              location: 'Dor nas Costas',
              progress: { completed: 3, total: 8 },
              status: 'Em andamento' 
            },
            { 
              id: '2', 
              date: '2025-05-20', 
              type: 'Triagem', 
              location: 'Dor no Joelho',
              progress: { completed: 6, total: 6 },
              status: 'Concluído' 
            },
            { 
              id: '3', 
              date: '2025-05-15', 
              type: 'Triagem', 
              location: 'Dor no Ombro',
              progress: { completed: 5, total: 5 },
              status: 'Concluído' 
            }
          ];
          
          const mockUserStats = {
            exercisesDone: 14,
            triagemCount: 3,
            consecutiveDays: 5,
            lastTriagem: '2025-05-28'
          };

          // Check if user has any previous triagem
          const hasTriagemHistory = mockTriagemHistory.length > 0;
          
          setIsFirstAccess(!hasTriagemHistory);
          setUserStats(mockUserStats);
          setTriagemHistory(mockTriagemHistory);
          setIsLoading(false);
        }, 1000); // Simulate network delay
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={{ backgroundColor: colors.light.paleSand }} className="flex-1">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.light.deepBlue} />
          <Text className="mt-4 text-gray-600">Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.light.paleSand }} className="flex-1">
      <View className="flex-1 w-full h-full p-4">
        {isFirstAccess ? (
          <FirstAccessDashboard />
        ) : (
          <RegularDashboard userStats={userStats} triagemHistory={triagemHistory} />
        )}
      </View>
    </SafeAreaView>
  );
}
