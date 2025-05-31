import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../styles/colors';
import ProfileAvatar from '../../components/ProfileAvatar';

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

// Regular Dashboard Component is no longer needed as we've inlined the content

export default function Dashboard() {
  const router = useRouter();
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
      <View className="flex-1 items-center justify-center py-6">
        <ActivityIndicator size="large" color={colors.light.deepBlue} />
        <Text className="mt-4 text-textPrimary">Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-paleSand">
      <ScrollView className="flex-1 px-4">
        <View className="items-center pt-6 pb-4">
          <ProfileAvatar name="Gustavo" size={120} />
          <Text className="text-textPrimary text-xl font-bold mt-4">Olá, Gustavo!</Text>
        </View>
        
        {isFirstAccess ? (
          <FirstAccessDashboard />
        ) : (
          <View className="flex-1">
            {/* User Stats Section */}
            <View className="bg-white rounded-lg p-6 shadow-sm mb-4">
              <Text className="text-xl font-bold text-deepBlue mb-4">Estatísticas</Text>
              <View className="flex-row justify-between mb-2">
                <View className="items-center">
                  <Text className="text-2xl font-bold text-deepBlue">{userStats.exercisesDone}</Text>
                  <Text className="text-textPrimary text-sm">Exercícios</Text>
                </View>
                
                <View className="items-center">
                  <Text className="text-2xl font-bold text-deepBlue">{userStats.triagemCount}</Text>
                  <Text className="text-textPrimary text-sm">Triagens</Text>
                </View>
                
                <View className="items-center">
                  <Text className="text-2xl font-bold text-deepBlue">{userStats.consecutiveDays}</Text>
                  <Text className="text-textPrimary text-sm">Dias seguidos</Text>
                </View>
              </View>
            </View>

            {/* New Screening Button */}
            <TouchableOpacity 
              className="bg-deepBlue py-4 rounded-lg mb-4 shadow-sm" 
              onPress={() => router.push('/(tabs)/(triagem)/triagem')}
            >
              <Text className="text-white font-bold text-center">Começar Nova Triagem</Text>
            </TouchableOpacity>

            {/* Current Progress Section */}
            {triagemHistory.length > 0 && (
              <View className="bg-white rounded-lg p-6 shadow-sm mb-4">
                <Text className="text-lg font-bold text-deepBlue mb-3">Progresso Atual</Text>
                <View className="flex-row justify-between mb-1">
                  <Text className="font-bold text-deepBlue">Triagem - {triagemHistory[0].location}</Text>
                  <Text className="text-textPrimary">{new Date(triagemHistory[0].date).toLocaleDateString('pt-BR')}</Text>
                </View>
                
                {/* Progress Bar */}
                <View className="h-2 bg-gray-200 rounded-full mt-3 mb-2">
                  <View 
                    className="h-2 bg-deepBlue rounded-full" 
                    style={{ 
                      width: `${(triagemHistory[0].progress.completed / triagemHistory[0].progress.total) * 100}%`
                    }} 
                  />
                </View>
                
                <View className="flex-row justify-between items-center">
                  <Text className="text-textPrimary text-sm">{triagemHistory[0].progress.completed} de {triagemHistory[0].progress.total} exercícios concluídos</Text>
                  <TouchableOpacity>
                    <Text className="text-deepBlue font-medium">Continuar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* History Section */}
            <View className="flex-1 mb-6">
              <Text className="text-lg font-bold text-deepBlue mb-3">Histórico de Triagens</Text>
              
              {triagemHistory.length > 0 ? (
                <FlatList
                  data={triagemHistory}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      className="bg-white rounded-lg p-4 mb-3 shadow-sm flex-row justify-between items-center"
                      onPress={() => router.push({ pathname: '/(tabs)/(triagem)/diagnostic-ideal', params: { id: item.id } })}
                    >
                      <View>
                        <Text className="font-bold text-deepBlue">Triagem - {item.location}</Text>
                        <Text className="text-textPrimary text-sm">{new Date(item.date).toLocaleDateString('pt-BR')}</Text>
                      </View>
                      <View className="flex-row items-center">
                        <Text className="font-medium mr-2 text-deepBlue">{item.progress.completed}/{item.progress.total}</Text>
                        <View className="bg-deepBlue rounded-full w-8 h-8 items-center justify-center">
                          <Ionicons name="chevron-forward" size={18} color="#F5F5F5" />
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                  nestedScrollEnabled={true}
                />
              ) : (
                <View className="bg-white rounded-lg p-6 items-center justify-center">
                  <Text className="text-textPrimary text-center">Nenhuma triagem encontrada</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
