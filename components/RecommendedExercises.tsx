import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Exercise, getGroupTypeColor } from '../lib/exerciseUtils';
import { fetchUserRecommendedExercises, markExerciseCompleted } from '../lib/recommendationUtils';
import colors from '../styles/colors';

type RecommendedExercisesProps = {
  userId: string;
  triagemId?: string;
  onComplete?: () => void;
};

export const RecommendedExercises = ({ userId, triagemId, onComplete }: RecommendedExercisesProps) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const router = useRouter();

  useEffect(() => {
    loadRecommendedExercises();
  }, [userId, triagemId]);

  const loadRecommendedExercises = async () => {
    try {
      setLoading(true);
      const recommendedExercises = await fetchUserRecommendedExercises(userId, triagemId);
      setExercises(recommendedExercises);

      const completedStatus: Record<string, boolean> = {};
      recommendedExercises.forEach(exercise => {
        completedStatus[exercise.id] = false;
      });
      setCompletedExercises(completedStatus);
    } catch (error) {
      console.error('Error loading recommended exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExercisePress = (exercise: Exercise) => {
    router.push({
      pathname: '/exercise/[id]',
      params: { id: exercise.id }
    });
  };

  const handleMarkCompleted = async (exerciseId: string) => {
    try {
      await markExerciseCompleted(userId, exerciseId);

      setCompletedExercises(prev => ({
        ...prev,
        [exerciseId]: true
      }));

      const updatedCompleted = {
        ...completedExercises,
        [exerciseId]: true
      };

      const allCompleted = exercises.every(ex => updatedCompleted[ex.id]);
      if (allCompleted && onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error marking exercise as completed:', error);
    }
  };

  const renderExerciseCard = ({ item }: { item: Exercise }) => {
    const isCompleted = completedExercises[item.id];

    return (
      <View className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
        <TouchableOpacity
          className="flex-row"
          onPress={() => handleExercisePress(item)}
        >
          <View className="w-1/3">
            <Image
              source={{ uri: item.thumbnail_url || 'https://via.placeholder.com/150' }}
              className="h-24 w-full"
              resizeMode="cover"
            />
            {isCompleted && (
              <View className="absolute top-0 right-0 bg-green-500 p-1 rounded-bl-lg">
                <Text className="text-white text-xs">✓</Text>
              </View>
            )}
          </View>
          <View className="w-2/3 p-3">
            <Text className="text-lg font-bold text-gray-800">{item.name}2</Text>
            <View className="flex-row items-center mt-1">
              <View
                className="h-2 w-2 rounded-full mr-2"
                style={{ backgroundColor: getGroupTypeColor(item.group_type) }}
              />
              <Text className="text-xs text-gray-600">{item.group_type}</Text>
            </View>
            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-xs text-gray-500">{item.duration} min</Text>
              <View className="bg-gray-100 px-2 py-1 rounded">
                <Text className="text-xs">{item.difficulty}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {!isCompleted && (
          <TouchableOpacity
            className="bg-light-deepBlue py-2 mx-3 mb-3 rounded-lg"
            style={{ backgroundColor: colors.light.deepBlue }}
            onPress={() => handleMarkCompleted(item.id)}
          >
            <Text className="text-center text-white font-medium">
              Marcar como concluído
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderHeader = () => (
    <View className="mb-4">
      <Text className="text-2xl font-bold text-gray-800 mb-2">
        Exercícios Recomendados
      </Text>
      <Text className="text-gray-600">
        Estes exercícios foram selecionados especialmente para você com base na sua avaliação.
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View className="flex-1 justify-center items-center py-8">
      <Text className="text-lg text-gray-500 text-center">
        Nenhum exercício recomendado encontrado.
      </Text>
      <Text className="text-sm text-gray-400 mt-2 text-center">
        Complete uma avaliação para receber recomendações personalizadas.
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <ActivityIndicator size="large" color={colors.light.deepBlue} />
        <Text className="mt-4 text-gray-600">
          Carregando suas recomendações...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      {exercises.length > 0 ? (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={renderExerciseCard}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmpty()
      )}
    </View>
  );
};
