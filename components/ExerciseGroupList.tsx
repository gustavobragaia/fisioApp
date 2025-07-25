import React from "react";
import { FlatList } from "react-native";
import { EmptyState } from "./EmptyState";
import ExerciseListItem from "./exercises/ExerciseListItem";

export type Exercise = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  steps: string[];
  duration: string;
  difficulty: "fácil" | "médio" | "difícil";
  groupId?: string;
};

export type ExerciseFromBack = {
  created_at: string
  descricao: string
  description: string
  difficulty: string
  duration: string
  exerciseCount: number
  group_type: string
  id: string
  imageUrl: string
  is_published: boolean
  name: string
  nome: string
  progress: string
  region_name: string
  steps: {
    description: string
    title: string
  }[]
  thumbnail_url: string
  tipo: string
  title: string
  video_url: string
}


type ExerciseGroupListProps = {
  exercises: Exercise[];
  onExercisePress?: (exercise: Exercise, index: number) => void;
  disabled?: boolean;
};

export default function ExerciseGroupList({
  exercises,
  onExercisePress,
  disabled = false,
}: ExerciseGroupListProps) {
  const renderExerciseItem = ({
    item,
    index,
  }: {
    item: Exercise;
    index: number;
  }) => {
    return (
      <ExerciseListItem
        title={item.name}
        description={item.description}
        duration={item.duration}
        progress="pending"
        difficulty={item.difficulty}
        imageUrl={item.imageUrl}
        onPress={() => onExercisePress?.(item, index)}
        disabled={disabled}
      />
    );
  };

  const ListEmptyComponent = () => (
    <EmptyState variant="sad" title="Nenhum exercício disponível" />
  );

  return (
    <FlatList
      data={exercises}
      renderItem={renderExerciseItem}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={
        exercises.length === 0 ? { flexGrow: 1 } : undefined
      }
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
}
