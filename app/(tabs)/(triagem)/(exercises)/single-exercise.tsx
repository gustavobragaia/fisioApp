import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, Alert } from 'react-native';
import BackHeader from '../../../../components/BackHeader';
import Exercise from '../../../../components/Exercise';
import ExerciseFeedback from '../../../../components/ExerciseFeedback';
import { supabase } from '../../../../lib/supabase';


// FeedbackScreen component has been moved to /components/ExerciseFeedback.tsx

export default function SingleExerciseScreen() {
  const router = useRouter();
  const [showFeedback, setShowFeedback] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Get the current user on component mount
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data && data.user) {
        setUserId(data.user.id);
      }
    };
    
    getUser();
  }, []);
  
  const params = useLocalSearchParams<{
    exerciseId: string;
    exerciseName: string;
    exerciseVideoUrl?: string;
    exerciseSteps?: string; // JSON stringified array of steps
    exerciseDuration?: string; // Duration in seconds
    exerciseIndex?: string; // Current index in the exercise list
    totalExercises?: string; // Total number of exercises in the group
    groupId?: string; // ID of the exercise group
    triagemId?: string; // ID of the triagem this exercise is part of
  }>();

  // Parse exercise steps
  const exerciseSteps = React.useMemo(() => {
    try {
      if (params.exerciseSteps) {
        const parsed = JSON.parse(params.exerciseSteps);
        
        // Keep the objects intact for proper rendering
        if (Array.isArray(parsed)) {
          return parsed;
        } else if (typeof parsed === 'object') {
          // If it's an object but not an array, convert to array
          return Object.values(parsed);
        }
      }
      return [];
    } catch (error) {
      console.error('Error parsing exercise steps:', error);
      return [];
    }
  }, [params.exerciseSteps]);
  
  // Parse duration (default to 30 seconds)
  const duration = React.useMemo(() => {
    try {
      if (params.exerciseDuration) {
        return 30;
        // return parseInt(params.exerciseDuration, 10);
      }
      return 30; // Default 30 seconds
    } catch (error) {
      console.error('Error parsing exercise duration:', error);
      return 30;
    }
  }, [params.exerciseDuration]);

  // Parse exercise index and total exercises
  const currentIndex = params.exerciseIndex ? parseInt(params.exerciseIndex, 10) : 0;
  const totalExercises = params.totalExercises ? parseInt(params.totalExercises, 10) : 1;
  
  const handleExerciseComplete = () => {
    // Only show the feedback screen when the last exercise is completed
    if (currentIndex === totalExercises - 1) {
      setShowFeedback(true);
    }
    
    // Exercise is now complete, but we'll only mark it as completed in the database
    // when the user clicks the "PRÓXIMO" button
    console.log('Exercise completed! Ready for user to click PRÓXIMO');
  };

  const handlePreviousExercise = () => {
    if (currentIndex > 0) {
      // Reset feedback state first
      setShowFeedback(false);
      
      // Navigate directly to the previous exercise
      // Using replace instead of push to ensure a fresh component mount
      router.replace({
        pathname: '/(tabs)/(triagem)/(exercises)/exercise-group',
        params: {
          goToExerciseIndex: (currentIndex - 1).toString(),
          categoryName: params.groupId || '',
          categoryType: 'Exercícios',
          // Ensure we pass the triagem ID to stay within current triagem
          triagemId: params.triagemId,
          // Add a timestamp to force the component to remount with fresh state
          timestamp: Date.now().toString()
        }
      });
    }
  };
  
  const handleNextExercise = async () => {
    if (currentIndex < totalExercises - 1) {
      // Mark the current exercise as completed in the database
      if (userId && params.exerciseId && params.triagemId) {
        try {
          // Update the user_exercises record to mark it as completed
          const { error } = await supabase
            .from('user_exercises')
            .update({
              completed: true,
              completion_date: new Date().toISOString()
            })
            .eq('user_id', userId)
            .eq('exercise_id', params.exerciseId)
            .eq('triagem_id', params.triagemId);
          
          if (error) {
            console.error('Error updating exercise completion status:', error);
          } else {
            console.log('Exercise marked as completed successfully!');
          }
        } catch (error) {
          console.error('Error in handleNextExercise:', error);
        }
      }
      
      // Reset feedback state first
      setShowFeedback(false);
      
      // Navigate directly to the next exercise
      // Using replace instead of push to ensure a fresh component mount
      router.replace({
        pathname: '/(tabs)/(triagem)/(exercises)/exercise-group',
        params: {
          goToExerciseIndex: (currentIndex + 1).toString(),
          categoryName: params.groupId || '',
          categoryType: 'Exercícios',
          // Ensure we pass the triagem ID to stay within current triagem
          triagemId: params.triagemId,
          // Add a timestamp to force the component to remount with fresh state
          timestamp: Date.now().toString()
        }
      });
    }
  };

  // Mark exercise as completed and return to exercise group screen
  const handleReturnToGroup = async () => {
    if (!userId || !params.exerciseId || !params.triagemId) {
      // If we don't have the necessary data, just navigate back
      navigateBackToGroup();
      return;
    }
    
    setLoading(true);
    
    try {
      // Update the user_exercises record to mark it as completed
      const { error } = await supabase
        .from('user_exercises')
        .update({
          completed: true,
          completion_date: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('exercise_id', params.exerciseId)
        .eq('triagem_id', params.triagemId);
      
      if (error) {
        console.error('Error updating exercise completion status:', error);
        Alert.alert('Erro', 'Não foi possível salvar o progresso do exercício.');
      } else {
        console.log('Exercise marked as completed successfully!');
      }
    } catch (error) {
      console.error('Error in handleReturnToGroup:', error);
    } finally {
      setLoading(false);
      // Reset feedback state and navigate back
      setShowFeedback(false);
      navigateBackToGroup();
    }
  };
  
  // Helper function to navigate back to the exercise group screen
  const navigateBackToGroup = () => {
    // Use replace for consistency with other navigation functions
    router.replace({
      pathname: '/(tabs)/(triagem)/(exercises)/exercise-group',
      params: {
        categoryName: params.groupId || '',
        categoryType: 'Exercícios',
        // Ensure we pass the triagem ID to stay within current triagem
        triagemId: params.triagemId,
        // Add a timestamp to force the component to remount with fresh state
        timestamp: Date.now().toString()
      }
    });
  };

  // Repeat the current exercise
  const handleRepeatExercise = () => {
      (false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {showFeedback ? (
        <ExerciseFeedback 
          onRepeat={handleRepeatExercise}
          onComplete={handleReturnToGroup}
          onNext={currentIndex < totalExercises - 1 ? handleNextExercise : undefined}
        />
      ) : (
        <View className="flex-1">
          {/* Header with progress indicator */}
          <View className="px-4 pt-4 pb-2">
            <BackHeader title={params.exerciseName || 'Exercício'} />
            
            {/* Exercise Progress */}
            {totalExercises > 1 && (
              <View className="flex-row items-center justify-between mt-2 mb-1">
                <Text className="text-sm text-textPrimary">
                  Exercício {currentIndex + 1} de {totalExercises}
                </Text>
                <View className="flex-row items-center">
                  <View className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <View 
                      className="h-full bg-deepBlue rounded-full" 
                      style={{ width: `${((currentIndex + 1) / totalExercises) * 100}%` }}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
          
          {/* Exercise Component with shadow and rounded corners */}
            <ScrollView>
              <View className="flex-1 px-4">
                <View className="flex-1 bg-white rounded-2xl overflow-hidden shadow-sm">
                  <Exercise
                    id={params.exerciseId}
                    name={params.exerciseName}
                    videoUrl={params.exerciseVideoUrl}
                    steps={exerciseSteps}
                    duration={duration}
                    onComplete={handleExerciseComplete}
                    onPrevious={currentIndex > 0 ? handlePreviousExercise : undefined}
                    onNext={currentIndex < totalExercises - 1 ? handleNextExercise : undefined}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
      )}
    </SafeAreaView>
  );
}