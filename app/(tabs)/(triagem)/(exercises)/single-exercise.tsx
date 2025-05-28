import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import BackHeader from '../../../../components/BackHeader';
import Exercise from '../../../../components/Exercise';

export default function SingleExerciseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    exerciseId: string;
    exerciseName: string;
    exerciseVideoUrl?: string;
    exerciseSteps?: string; // JSON stringified array of steps
    exerciseDuration?: string; // Duration in seconds
    exerciseIndex?: string; // Current index in the exercise list
    totalExercises?: string; // Total number of exercises in the group
    groupId?: string; // ID of the exercise group
  }>();

  // Parse exercise steps
  const exerciseSteps = React.useMemo(() => {
    try {
      if (params.exerciseSteps) {
        return JSON.parse(params.exerciseSteps) as string[];
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
        return parseInt(params.exerciseDuration, 10);
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
    // Handle exercise completion - could navigate back or show a success message
    console.log('Exercise completed!');
  };
  
  const handlePreviousExercise = () => {
    if (currentIndex > 0) {
      // Navigate directly to the previous exercise
      // We need to go back and then navigate to the specific exercise
      // In a more advanced implementation, we would store the full exercise list in a context or state manager
      router.replace({
        pathname: '/(tabs)/(triagem)/(exercises)/exercise-group',
        params: {
          goToExerciseIndex: (currentIndex - 1).toString(),
          categoryName: params.groupId || '',
          categoryType: 'Exercícios'
        }
      });
    }
  };
  
  const handleNextExercise = () => {
    if (currentIndex < totalExercises - 1) {
      // Navigate directly to the next exercise
      // In a more advanced implementation, we would store the full exercise list in a context or state manager
      router.replace({
        pathname: '/(tabs)/(triagem)/(exercises)/exercise-group',
        params: {
          goToExerciseIndex: (currentIndex + 1).toString(),
          categoryName: params.groupId || '',
          categoryType: 'Exercícios'
        }
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        {/* Header */}
        <BackHeader title={params.exerciseName || 'Exercício'} />
        
        {/* Exercise Component */}
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
    </SafeAreaView>
  );
}