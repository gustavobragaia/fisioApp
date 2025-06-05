import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import colors from '../styles/colors';

const { width } = Dimensions.get('window');

export type ExerciseProps = {
  id: string;
  name: string;
  videoUrl?: string;
  steps?: string[];
  onComplete?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  duration?: number; // Duration in seconds
};

export default function Exercise({ 
  id, 
  name, 
  videoUrl = 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', 
  steps = [],
  onComplete,
  onPrevious,
  onNext,
  duration = 30 // Default 30 seconds
}: ExerciseProps) {
  // Video player reference
  const videoRef = useRef<Video>(null);
  
  // Timer state
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [exerciseComplete, setExerciseComplete] = useState(false);

  // Reset timer and state when exercise ID changes
  useEffect(() => {
    // Reset timer to initial duration
    setTimeRemaining(duration);
    // Reset timer running state
    setTimerRunning(false);
    // Reset exercise completion state
    setExerciseComplete(false);
    
    // Reset video if available
    if (videoRef.current) {
      videoRef.current.stopAsync().catch(error => {
        console.error('Error stopping video:', error);
      });
    }
  }, [id, duration]); // Depend on exercise ID and duration

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
      if (onComplete) onComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timeRemaining, onComplete]);

  // Start exercise
  const startExercise = async () => {
    try {
      // Reset timer if it was already completed
      if (exerciseComplete) {
        setTimeRemaining(duration);
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
    <View className="flex-1">
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
      {steps.length > 0 && (
        <View className="bg-white p-4 rounded-lg shadow-sm">
          <Text className="text-lg font-bold text-deepBlue mb-2">Como fazer:</Text>
          {steps.map((step, index) => (
            <View key={index} className="flex-row mb-2">
              <Text className="text-deepBlue font-bold mr-2">{index + 1}.</Text>
              <Text className="text-textPrimary flex-1">{step}</Text>
            </View>
          ))}
        </View>
      )}
      
      {/* Navigation buttons */}
      <View className="flex-row justify-between mt-4">
        {onPrevious && (
          <TouchableOpacity 
            className="bg-[#F4F1EE] p-3 rounded-lg flex-1 mr-2 items-center"
            onPress={onPrevious}
          >
            <Text className="text-deepBlue font-medium">Anterior</Text>
          </TouchableOpacity>
        )}
        {onNext && (
          <TouchableOpacity 
            className={`p-3 rounded-lg flex-1 ml-2 items-center ${exerciseComplete ? 'bg-[#4A6FA5]' : 'bg-gray-300'}`}
            onPress={exerciseComplete ? onNext : undefined}
            disabled={!exerciseComplete}
          >
            <Text className={`font-medium ${exerciseComplete ? 'text-white' : 'text-gray-500'}`}>Próximo</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
