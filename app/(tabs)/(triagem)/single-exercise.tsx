import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import BackHeader from '../../../components/BackHeader';
import Exercise from '../../../components/Exercise';

export default function SingleExerciseScreen() {
  const params = useLocalSearchParams<{
    exerciseId: string;
    exerciseName: string;
    exerciseVideoUrl?: string;
    exerciseSteps?: string; // JSON stringified array of steps
    exerciseDuration?: string; // Duration in seconds
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

  const handleExerciseComplete = () => {
    // Handle exercise completion - could navigate back or show a success message
    console.log('Exercise completed!');
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
        />
      </View>
    </SafeAreaView>
  );
}