import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import BackHeader from '../../../components/BackHeader';
import colors from '../../../styles/colors';

const { width } = Dimensions.get('window');

export default function SingleExerciseScreen() {
  const params = useLocalSearchParams<{
    exerciseId: string;
    exerciseName: string;
    exerciseVideoUrl?: string;
    exerciseSteps?: string; // JSON stringified array of steps
  }>();

  // Video player reference
  const videoRef = useRef<Video>(null);
  
  // Timer state
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 seconds
  const [exerciseComplete, setExerciseComplete] = useState(false);

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

  // Video URL (use a default if not provided)
  const videoUrl = params.exerciseVideoUrl || 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (timerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timerRunning && timeRemaining === 0) {
      setTimerRunning(false);
      setExerciseComplete(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timeRemaining]);

  // Start exercise
  const startExercise = async () => {
    try {
      // Reset timer if it was already completed
      if (exerciseComplete) {
        setTimeRemaining(30);
        setExerciseComplete(false);
      }

      // Start the timer
      setTimerRunning(true);

      // Play the video
      if (videoRef.current) {
        await videoRef.current.playAsync();
      }
    } catch (error) {
      console.error('Error starting exercise:', error);
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        {/* Header */}
        <BackHeader title={params.exerciseName || 'Exercício'} />

        {/* Video Player */}
        <View className="items-center mb-6 rounded-xl overflow-hidden">
          <Video
            ref={videoRef}
            source={{ uri: videoUrl }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            style={{ width: width - 32, height: 220 }}
          />
        </View>

        {/* Timer */}
        <View className="items-center mb-6">
          <Text className="text-lg text-textPrimary mb-2">Tempo restante:</Text>
          <View className="bg-[#F4F1EE] p-4 rounded-full w-32 h-32 items-center justify-center">
            <Text className="text-3xl font-bold text-deepBlue">{formatTime(timeRemaining)}</Text>
          </View>
        </View>

        {/* Start Button */}
        <TouchableOpacity 
          className={`p-4 rounded-lg items-center justify-center mb-6 ${timerRunning ? 'bg-[#CDEFE8]' : exerciseComplete ? 'bg-[#AEE1F9]' : 'bg-[#4A6FA5]'}`}
          onPress={startExercise}
          disabled={timerRunning}
        >
          <Text className={`text-lg font-bold ${timerRunning ? 'text-textPrimary' : 'text-white'}`}>
            {timerRunning ? 'Em andamento...' : exerciseComplete ? 'Repetir exercício' : 'Iniciar exercício'}
          </Text>
        </TouchableOpacity>

        {/* Exercise Steps */}
        {exerciseSteps.length > 0 && (
          <View className="bg-white p-4 rounded-lg shadow-sm">
            <Text className="text-lg font-bold text-deepBlue mb-2">Como fazer:</Text>
            {exerciseSteps.map((step, index) => (
              <View key={index} className="flex-row mb-2">
                <Text className="text-deepBlue font-bold mr-2">{index + 1}.</Text>
                <Text className="text-textPrimary flex-1">{step}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}