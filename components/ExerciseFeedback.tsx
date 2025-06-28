import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

interface ExerciseFeedbackProps {
  onRepeat: () => void;
  onComplete: () => void;
  onNext?: () => void;
}

/**
 * Feedback component that shows after exercise completion
 */
const ExerciseFeedback = ({ 
  onRepeat, 
  onComplete, 
  onNext 
}: ExerciseFeedbackProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between px-6 pt-10 pb-8">
        {/* Header */}
        <View className="items-center">
          <Text className="text-4xl font-bold text-center text-deepBlue">Alívio</Text>
        </View>
        
        {/* Main Content */}
        <View className="flex-1 justify-center items-center my-6">
          {/* Success Icon */}
          <View className="w-24 h-24 rounded-full bg-[#E6F7FF] border-4 border-[#AEE1F9] items-center justify-center mb-8 shadow-sm">
            <Text className="text-4xl">☺️</Text>
          </View>
          
          {/* Feedback Message */}
          <View className="w-full items-center">
            <Text className="text-3xl font-bold text-center mb-3 text-deepBlue">Você melhorou?</Text>
            <Text className="text-lg text-center text-textPrimary mb-2 max-w-xs">
              Você está se tornando sua melhor versão!
            </Text>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View className="w-full">
          <TouchableOpacity 
            className="w-full bg-[#AEE1F9] p-5 rounded-2xl mb-4 items-center shadow-sm"
            onPress={onComplete}
            activeOpacity={0.8}
          >
            <Text className="text-lg font-bold text-deepBlue">Sim, estou aliviado 😊</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="w-full bg-[#CDEFE8] p-5 rounded-2xl mb-4 items-center shadow-sm"
            onPress={onRepeat}
            activeOpacity={0.8}
          >
            <Text className="text-lg font-bold text-deepBlue flex-row items-center">
              Quero repetir <Text>🔄</Text>
            </Text>
          </TouchableOpacity>
          
          {onNext && (
            <TouchableOpacity 
              className="w-full bg-[#4A6FA5] p-5 rounded-2xl items-center shadow-sm"
              onPress={onNext}
              activeOpacity={0.8}
            >
              <Text className="text-lg font-bold text-white">Mais um alongamento/meditação</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExerciseFeedback;
