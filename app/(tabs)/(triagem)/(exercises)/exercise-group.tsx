import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import BackHeader from '../../../../components/BackHeader';
import ExerciseGroupList, { Exercise } from '../../../../components/ExerciseGroupList';
import RecommendedExercises from '../../../../components/RecommendedExercises';
import { supabase } from '../../../../lib/supabase';
import colors from '../../../../styles/colors';

// Exercise type is now imported from the ExerciseGroupList component

export default function ExerciseCategoryScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showRecommended, setShowRecommended] = useState(false);
  
  const params = useLocalSearchParams<{
    categoryName: string;
    categoryType: string;
    exercises: string; // JSON stringified array of exercises
    goToExerciseIndex?: string; // Index of exercise to navigate to directly
    triagemId?: string; // ID of the triagem to show recommendations for
    isRecommended?: string; // Whether to show recommended exercises
  }>();

  // Parse exercises from params
  const exercises: Exercise[] = React.useMemo(() => {
    try {
      if (params.exercises) {
        return JSON.parse(params.exercises);
      }
      return [];
    } catch (error) {
      console.error('Error parsing exercises:', error);
      return [];
    }
  }, [params.exercises]);

  // Mock exercises if none provided
  const mockExercises: Exercise[] = [
    {
      id: '1',
      name: 'Alongamento de Pescoço',
      description: 'Alonga os músculos do pescoço para aliviar tensão',
      imageUrl: 'https://via.placeholder.com/150',
      steps: [
        'Sente-se com a coluna ereta',
        'Incline a cabeça para o lado direito',
        'Mantenha por 15 segundos',
        'Repita do lado esquerdo'
      ],
      duration: '30 segundos',
      difficulty: 'fácil'
    },
    {
      id: '2',
      name: 'Rotação de Ombros',
      description: 'Melhora a circulação e alivia tensão nos ombros',
      imageUrl: 'https://via.placeholder.com/150',
      steps: [
        'Fique em pé com os braços relaxados',
        'Gire os ombros para frente 10 vezes',
        'Gire os ombros para trás 10 vezes'
      ],
      duration: '1 minuto',
      difficulty: 'fácil'
    },
    {
      id: '3',
      name: 'Alongamento Lateral',
      description: 'Alonga os músculos laterais do tronco',
      imageUrl: 'https://via.placeholder.com/150',
      steps: [
        'Fique em pé com os pés afastados na largura dos ombros',
        'Levante o braço direito e incline o corpo para a esquerda',
        'Mantenha por 15 segundos',
        'Repita do outro lado'
      ],
      duration: '2 minutos',
      difficulty: 'médio'
    }
  ];

  // Use mock exercises if none provided
  const displayExercises = exercises.length > 0 ? exercises : mockExercises;
  
  // Check user authentication status
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };
    
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Check if we should show recommended exercises
  useEffect(() => {
    if (params.isRecommended === 'true') {
      setShowRecommended(true);
    } else {
      setShowRecommended(false);
    }
  }, [params.isRecommended]);
  
  // Check if we need to navigate directly to a specific exercise
  React.useEffect(() => {
    if (params.goToExerciseIndex) {
      const index = parseInt(params.goToExerciseIndex, 10);
      if (!isNaN(index) && index >= 0 && index < displayExercises.length) {
        // Navigate to the specified exercise
        handleExercisePress(displayExercises[index], index);
      }
    }
  }, [params.goToExerciseIndex]);

  // Handle exercise press
  const handleExercisePress = (exercise: Exercise, index: number) => {
    // Extract duration in seconds from the duration string (e.g., "2 minutos" -> 120)
    const durationInSeconds = parseDurationToSeconds(exercise.duration);
    
    // Navigate to single exercise screen
    router.push({
      pathname: '/(tabs)/(triagem)/(exercises)/single-exercise',
      params: {
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        exerciseVideoUrl: exercise.videoUrl,
        exerciseSteps: JSON.stringify(exercise.steps),
        exerciseDuration: durationInSeconds.toString(),
        exerciseIndex: index.toString(),
        totalExercises: displayExercises.length.toString(),
        groupId: params.categoryName // Using category name as group ID for now
      }
    });
  };
  
  // Helper function to parse duration string to seconds
  const parseDurationToSeconds = (durationStr: string): number => {
    try {
      // Extract numbers from the string
      const match = durationStr.match(/\d+/);
      if (!match) return 30; // Default to 30 seconds
      
      const value = parseInt(match[0], 10);
      
      // Check if the string contains minutes
      if (durationStr.includes('minuto')) {
        return value * 60; // Convert minutes to seconds
      }
      
      // For demo purposes, limit exercise duration to a maximum of 30 seconds
      // This makes testing easier - remove this line for production
      return Math.min(value, 30);
    } catch (error) {
      console.error('Error parsing duration:', error);
      return 30; // Default to 30 seconds
    }
  };

  // Handle completion of all recommended exercises
  const handleRecommendationsComplete = () => {
    // Navigate to a completion screen or show a success message
    router.push({
      pathname: '/(tabs)/(triagem)/diagnostic-ideal',
      params: {
        message: 'Parabéns! Você completou todos os exercícios recomendados.'
      }
    });
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color={colors.light.deepBlue} />
        <Text className="mt-4 text-gray-600">Carregando exercícios...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {showRecommended && user ? (
        // Show recommended exercises if isRecommended is true and user is logged in
        <View className="flex-1">
          <ScrollView className="flex-1 p-4">
            <BackHeader 
              title="Exercícios Recomendados"
              subtitle="Baseados na sua avaliação"
            />
            <RecommendedExercises 
              userId={user.id}
              triagemId={params.triagemId}
              onComplete={handleRecommendationsComplete}
            />
          </ScrollView>
        </View>
      ) : (
        // Show regular exercise group
        <ScrollView className="flex-1 p-4">
          {/* Header with back button */}
          <BackHeader 
            title={params.categoryName || 'Categoria de Exercícios'}
            subtitle={params.categoryType || 'Exercícios'}
          />

          {/* Exercise list */}
          <ExerciseGroupList 
            exercises={displayExercises}
            onExercisePress={handleExercisePress}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
