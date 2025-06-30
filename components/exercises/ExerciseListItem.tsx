import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type ExerciseDifficulty = "fácil" | "médio" | "difícil";
type ExerciseProgress = "pending" | "advanced" | "completed";

type ExerciseListItemProps = {
  title: string;
  description: string;
  duration: string;
  difficulty: ExerciseDifficulty;
  progress: ExerciseProgress;
  imageUrl?: string;
  onPress?: () => void;
  disabled?: boolean;
};

const ExerciseListItem: React.FC<ExerciseListItemProps> = ({
  title,
  description,
  duration,
  difficulty,
  progress,
  imageUrl,
  onPress,
  disabled = false,
}) => {
  const getDifficultyConfig = (difficulty: ExerciseDifficulty) => {
    switch (difficulty) {
      case "fácil":
        return {
          badgeText: "Fácil",
          badgeStyle: "bg-green-100",
          textColor: "text-green-700",
        };
      case "médio":
        return {
          badgeText: "Médio",
          badgeStyle: "bg-yellow-100",
          textColor: "text-yellow-700",
        };
      case "difícil":
        return {
          badgeText: "Difícil",
          badgeStyle: "bg-red-100",
          textColor: "text-red-700",
        };
    }
  };

  const getProgressConfig = (progress: ExerciseProgress) => {
    switch (progress) {
      case "completed":
        return {
          badgeText: "Concluído",
          badgeStyle: "bg-green-100",
          textColor: "text-green-700",
        };
      case "advanced":
        return {
          badgeText: "Em Progresso",
          badgeStyle: "bg-red-100",
          textColor: "text-red-700",
        };
      case "pending":
        return {
          badgeText: "Em andamento",
          badgeStyle: "bg-yellow-100",
          textColor: "text-yellow-700",
        };
    }
  };

  const difficultyConfig = getDifficultyConfig(difficulty);
  const progressConfig = getProgressConfig(progress);
  const imageSize = 80;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`
        flex-row items-start p-4 mb-3 rounded-xl
        ${disabled ? "opacity-50" : "opacity-100"}
        bg-white shadow-[0_3px_30px_rgba(16,16,16,0.03)] min-h-32
      `}
    >
      <View
        className="rounded-lg bg-gray-200 mr-4"
        style={{
          width: imageSize,
          height: imageSize,
        }}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full rounded-lg bg-gray-200/10 items-center justify-center">
            <Text className="text-gray-400 text-xs">Imagem</Text>
          </View>
        )}
      </View>

      <View className="flex-1 items-start">
        <Text className="text-lg font-semibold mb-1 text-textPrimary">
          {title}
        </Text>

        <Text className="text-textPrimary text-sm mb-1" numberOfLines={3}>
          {description}
        </Text>

        <Text className="text-textSecondary text-sm font-medium mb-3">
          Duração: {duration}
        </Text>

        <View className="flex-row gap-2">
          <View
            className={`px-2 py-1 rounded-full ${difficultyConfig.badgeStyle}`}
          >
            <Text
              className={`text-xs font-semibold ${difficultyConfig.textColor}`}
            >
              {difficultyConfig.badgeText}
            </Text>
          </View>

          <View
            className={`px-2 py-1 rounded-full ${progressConfig.badgeStyle}`}
          >
            <Text
              className={`text-xs font-semibold ${progressConfig.textColor}`}
            >
              {progressConfig.badgeText}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseListItem;
