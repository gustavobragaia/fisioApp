import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

export type Exercise = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  steps: string[];
  duration: string;
  difficulty: 'fácil' | 'médio' | 'difícil';
  groupId?: string; // Store the group_id for proper navigation
};

type ExerciseGroupListProps = {
  exercises: Exercise[];
  onExercisePress?: (exercise: Exercise, index: number) => void;
};

export default function ExerciseGroupList({ exercises, onExercisePress }: ExerciseGroupListProps) {
  // Render exercise item
  const renderExerciseItem = ({ item, index }: { item: Exercise, index: number }) => {
    // Get background color based on difficulty
    const getDifficultyBgColor = (difficulty: string) => {
      switch(difficulty) {
        case 'fácil': return 'bg-[#CDEFE8]';
        case 'médio': return 'bg-[#AEE1F9]';
        case 'difícil': return 'bg-[#F4F1EE]';
        default: return 'bg-[#F4F1EE]';
      }
    };

    return (
      <TouchableOpacity 
        className="bg-slate-100 p-4 rounded-lg shadow-sm mb-4 flex-row"
        onPress={() => onExercisePress ? onExercisePress(item, index) : null}
      >
        {item.imageUrl && (
          <Image 
            source={{ uri: item.imageUrl }}
            className="w-20 h-20 rounded-lg mr-4"
          />
        )}
        <View className="flex-1">
          <Text className="text-lg font-bold text-deepBlue mb-1">{item.name}</Text>
          <Text className="text-textPrimary mb-2">{item.description}</Text>
          <View className="flex-row justify-between">
            <Text className="text-sm text-textPrimary">Duração: {item.duration}</Text>
            <View className={`px-2 py-1 rounded-full ${getDifficultyBgColor(item.difficulty)}`}>
              <Text className="text-xs text-textPrimary">{item.difficulty}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={exercises}
      renderItem={renderExerciseItem}
      keyExtractor={(item) => item.id}
      scrollEnabled={false} // Disable scrolling as we're likely inside a ScrollView
      ListEmptyComponent={
        <View className="p-4 items-center">
          <Text className="text-textPrimary">Nenhum exercício disponível</Text>
        </View>
      }
    />
  );
}
