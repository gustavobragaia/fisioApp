import { Header } from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';
import colors from '../../styles/colors';

// Types for our data
interface TriagemItem {
  id: string;
  date: string;
  type: string;
  location: string;
  groupId: string;
  progress: { completed: number; total: number };
  status: string;
};

type UserStats = {
  exercisesDone: number;
  triagemCount: number;
  consecutiveDays: number;
  lastTriagem?: string;
  name: string;
};

// First Access Dashboard Component
const FirstAccessDashboard = () => {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center p-6">
      <View className="bg-white rounded-2xl p-8 shadow-md w-full items-center">
        <Ionicons name="fitness-outline" size={80} color="#4F46E5" />
        <Text className="text-2xl font-bold text-center mt-4 text-gray-800">
          Bem-vindo ao FisioApp2x!
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
  const [userStats, setUserStats] = useState<UserStats>({ exercisesDone: 0, triagemCount: 0, consecutiveDays: 0, name: '' });
  const [triagemHistory, setTriagemHistory] = useState<TriagemItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch real data from Supabase
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Get current user
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError || !userData.user) {
          console.error('Error fetching user:', userError);
          setIsLoading(false);
          return;
        }
        
        const userId = userData.user.id;
        
        // Get user data to retrieve the name
        const { data: userData2, error: userDataError } = await supabase
          .from('users')
          .select('name')
          .eq('id', userId)
          .single();
          
        if (userDataError) {
          console.error('Error fetching user data:', userDataError);
          // Continue with the rest of the data loading even if user data fetch fails
        }
        
        // Get user's triagens
        const { data: triagemData, error: triagemError } = await supabase
          .from('triagens')
          .select('id, created_at, type, status')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
          
        if (triagemError) {
          console.error('Error fetching triagens:', triagemError);
          setIsLoading(false);
          return;
        }
        
        // Format triagem data and get additional details for each triagem
        const formattedTriagemHistory: TriagemItem[] = [];
        
        for (const triagem of triagemData || []) {
          try {
            // Get location/symptom details based on triagem type
            let location = '';
            let groupId = '';
            
            if (triagem.type === 'pain') {
              const { data: painData, error: painError } = await supabase
                .from('pain_symptoms')
                .select('dor_com_mais_freq')
                .eq('triagem_id', triagem.id)
                .single();
                
              if (painError) {
                console.error('Error fetching pain data:', painError);
              }
              
              location = painData?.dor_com_mais_freq || 'Dor';
              
              // For pain type, we'll use the location as the group_id
              // Common group_ids for pain: 'Pescoço', 'Lombar', 'Ombro', etc.
              groupId = location;
            } else if (triagem.type === 'mental') {
              const { data: mentalData, error: mentalError } = await supabase
                .from('mental_health_symptoms')
                .select('como_esta_sentindo')
                .eq('triagem_id', triagem.id)
                .single();
                
              if (mentalError) {
                console.error('Error fetching mental health data:', mentalError);
              }
              
              location = mentalData?.como_esta_sentindo || 'Saúde Mental';
              
              // For mental health, use the feeling as the group_id
              // Common group_ids for mental health: 'Ansioso(a)', 'Estressado(a)', etc.
              groupId = location;
            }
            
            // Get progress (completed vs total exercises)
            const { data: exercisesData, error: exercisesError } = await supabase
              .from('user_exercises')
              .select('completed')
              .eq('triagem_id', triagem.id)
              .eq('user_id', userId);
              
            if (exercisesError) {
              console.error('Error fetching exercises data:', exercisesError);
            }
            
          const total = exercisesData?.length || 0;
          const completed = exercisesData?.filter((ex: { completed: boolean }) => ex.completed).length || 0;
          
          formattedTriagemHistory.push({
            id: triagem.id,
            date: triagem.created_at,
            type: triagem.type === 'pain' ? 'Dor' : 'Saúde Mental',
            location: location,
            groupId: groupId, // Include the groupId field
            progress: { completed, total },
            status: triagem.status || 'Em andamento'
          });
          } catch (error) {
            console.error('Error processing triagem item:', error);
            // Continue with next triagem item
          }
        }
        
        // Calculate user stats
        const stats: UserStats = {
          exercisesDone: 0,
          triagemCount: formattedTriagemHistory.length,
          consecutiveDays: 0,
          lastTriagem: formattedTriagemHistory[0]?.date,
          name: userData2?.name || userData.user.email?.split('@')[0] || 'Usuário'
        };
        
        // Count total completed exercises
        const { data: completedExercises, error: completedExercisesError } = await supabase
          .from('user_exercises')
          .select('completion_date')
          .eq('user_id', userId)
          .eq('completed', true);
          
        if (completedExercisesError) {
          console.error('Error fetching completed exercises:', completedExercisesError);
          // Continue with default values
        }
          
        stats.exercisesDone = completedExercises?.length || 0;
        
        // Calculate consecutive days (simplified version)
        // For a more accurate version, we would need to check each day
        if (completedExercises && completedExercises.length > 0) {
          // Get unique dates when exercises were completed
          const uniqueDates = new Set<string>();
          completedExercises.forEach((ex: { completion_date: string | null }) => {
            if (ex.completion_date) {
              uniqueDates.add(new Date(ex.completion_date).toDateString());
            }
          });
          
          // Count consecutive days from today backwards
          const today = new Date();
          let consecutiveDays = 0;
          
          for (let i = 0; i < 30; i++) { // Check up to 30 days back
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            
            if (uniqueDates.has(checkDate.toDateString())) {
              consecutiveDays++;
            } else if (i > 0) { // If we find a gap after the first day, stop counting
              break;
            }
          }
          
          stats.consecutiveDays = consecutiveDays;
        }

        // Check if user has any previous triagem
        const hasTriagemHistory = formattedTriagemHistory.length > 0;
        
        setIsFirstAccess(!hasTriagemHistory);
        setUserStats(stats);
        setTriagemHistory(formattedTriagemHistory);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Always set loading to false, even if there were errors
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
        <Header 
          name={userStats.name + "oi"}
        />
        
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
                  <TouchableOpacity
                    onPress={() => {
                      console.log('Continuar button - navigating to triagem with ID:', triagemHistory[0].id);
                      const params = {
                        id: triagemHistory[0].id,
                        type: triagemHistory[0].type === 'Dor' ? 'pain' : 'mental'
                      };
                      const queryString = `?id=${encodeURIComponent(params.id)}&type=${encodeURIComponent(params.type)}`;
                      router.push(`/(tabs)/(triagem)/diagnostic-ideal${queryString}`);
                    }}
                  >
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
                  renderItem={({ item }) => {
                    console.log('Rendering triagem item with ID:', item.id);
                    return (
                    <TouchableOpacity 
                      className="bg-white rounded-lg p-4 mb-3 shadow-sm flex-row justify-between items-center"
                      onPress={() => {
                        console.log('Navigating to triagem with ID:', item.id);
                        // Use a different approach for passing parameters
                        const params = {
                          id: item.id,
                          type: item.type === 'Dor' ? 'pain' : 'mental'
                        };
                        const queryString = `?id=${encodeURIComponent(item.id)}&type=${encodeURIComponent(params.type)}`;
                        router.push(`/(tabs)/(triagem)/diagnostic-ideal${queryString}`);
                      }}
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
                    );
                  }}
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
