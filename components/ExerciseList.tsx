import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { useRouter } from 'expo-router';
import { Exercise, ExerciseRegion, ExerciseGroupType, fetchExercises, fetchExerciseRegions, getGroupTypeColor } from '../lib/exerciseUtils';
import { colors } from '../styles/colors';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

type ExerciseListProps = {
  regionId?: string;
  groupType?: ExerciseGroupType;
  difficulty?: string;
};

export const ExerciseList = ({ regionId, groupType, difficulty }: ExerciseListProps) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [regions, setRegions] = useState<ExerciseRegion[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(regionId);
  const [selectedGroupType, setSelectedGroupType] = useState<ExerciseGroupType | undefined>(groupType);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | undefined>(difficulty);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const groupTypes: ExerciseGroupType[] = [
    'Alívio imediato da dor',
    'Alongamento',
    'Aquecimento',
    'Fortalecimento muscular'
  ];

  const difficultyLevels = ['Iniciante', 'Intermediário', 'Avançado'];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const regionsData = await fetchExerciseRegions();
        setRegions(regionsData);
        
        const exercisesData = await fetchExercises({
          regionId: selectedRegion,
          groupType: selectedGroupType,
          difficulty: selectedDifficulty
        });
        setExercises(exercisesData);
      } catch (error) {
        console.error('Error loading exercise data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [selectedRegion, selectedGroupType, selectedDifficulty]);

  const handleExercisePress = (exercise: Exercise) => {
    router.push({
      pathname: '/exercise/[id]',
      params: { id: exercise.id }
    });
  };

  const renderRegionFilter = () => (
    <StyledView className="mb-4">
      <StyledText className="text-lg font-bold mb-2 text-gray-800">Região</StyledText>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={regions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StyledTouchableOpacity
            className={`px-4 py-2 mr-2 rounded-full ${selectedRegion === item.id ? 'bg-primary' : 'bg-gray-200'}`}
            onPress={() => setSelectedRegion(selectedRegion === item.id ? undefined : item.id)}
          >
            <StyledText className={`${selectedRegion === item.id ? 'text-white' : 'text-gray-800'}`}>
              {item.name}
            </StyledText>
          </StyledTouchableOpacity>
        )}
      />
    </StyledView>
  );

  const renderGroupTypeFilter = () => (
    <StyledView className="mb-4">
      <StyledText className="text-lg font-bold mb-2 text-gray-800">Tipo de Exercício</StyledText>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={groupTypes}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <StyledTouchableOpacity
            className={`px-4 py-2 mr-2 rounded-full`}
            style={{ backgroundColor: selectedGroupType === item ? getGroupTypeColor(item) : colors.gray200 }}
            onPress={() => setSelectedGroupType(selectedGroupType === item ? undefined : item)}
          >
            <StyledText className={`${selectedGroupType === item ? 'text-white' : 'text-gray-800'}`}>
              {item}
            </StyledText>
          </StyledTouchableOpacity>
        )}
      />
    </StyledView>
  );

  const renderDifficultyFilter = () => (
    <StyledView className="mb-4">
      <StyledText className="text-lg font-bold mb-2 text-gray-800">Nível de Dificuldade</StyledText>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={difficultyLevels}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <StyledTouchableOpacity
            className={`px-4 py-2 mr-2 rounded-full ${selectedDifficulty === item ? 'bg-accent' : 'bg-gray-200'}`}
            onPress={() => setSelectedDifficulty(selectedDifficulty === item ? undefined : item)}
          >
            <StyledText className={`${selectedDifficulty === item ? 'text-white' : 'text-gray-800'}`}>
              {item}
            </StyledText>
          </StyledTouchableOpacity>
        )}
      />
    </StyledView>
  );

  const renderExerciseCard = ({ item }: { item: Exercise }) => (
    <StyledTouchableOpacity
      className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
      onPress={() => handleExercisePress(item)}
    >
      <StyledView className="flex-row">
        <StyledView className="w-1/3">
          <StyledImage
            source={{ uri: item.thumbnail_url || 'https://via.placeholder.com/150' }}
            className="h-24 w-full"
            resizeMode="cover"
          />
        </StyledView>
        <StyledView className="w-2/3 p-3">
          <StyledText className="text-lg font-bold text-gray-800">{item.name}</StyledText>
          <StyledView className="flex-row items-center mt-1">
            <StyledView 
              className="h-2 w-2 rounded-full mr-2" 
              style={{ backgroundColor: getGroupTypeColor(item.group_type) }} 
            />
            <StyledText className="text-xs text-gray-600">{item.group_type}</StyledText>
          </StyledView>
          <StyledView className="flex-row items-center justify-between mt-2">
            <StyledText className="text-xs text-gray-500">{item.duration} min</StyledText>
            <StyledView className="bg-gray-100 px-2 py-1 rounded">
              <StyledText className="text-xs">{item.difficulty}</StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  );

  return (
    <StyledView className="flex-1 p-4">
      {renderRegionFilter()}
      {renderGroupTypeFilter()}
      {renderDifficultyFilter()}
      
      {loading ? (
        <StyledView className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </StyledView>
      ) : exercises.length > 0 ? (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={renderExerciseCard}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <StyledView className="flex-1 justify-center items-center">
          <StyledText className="text-lg text-gray-500">Nenhum exercício encontrado</StyledText>
          <StyledText className="text-sm text-gray-400 mt-2">Tente ajustar os filtros</StyledText>
        </StyledView>
      )}
    </StyledView>
  );
};

export default ExerciseList;
