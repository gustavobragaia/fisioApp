import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";

type ExerciseStatus = "pending" | "advanced" | "completed" | "fácil" | "médio" | "difícil";

type ExerciseListItemProps = {
  title: string;
  description: string;
  duration: string;
  status: ExerciseStatus;
  imageUrl?: string;
  onPress?: () => void;
  disabled?: boolean;
};

const ExerciseListItem: React.FC<ExerciseListItemProps> = ({
  title,
  description,
  duration,
  status,
  imageUrl,
  onPress,
  disabled = false,
}) => {
  const getStatusConfig = (status: ExerciseStatus) => {
    switch (status) {
      case "completed":
        return {
          badgeText: "Concluído",
          badgeStyle: "bg-green-500",
          textColor: "text-green-700",
          opacity: 1,
        };
      case "advanced":
        return {
          badgeText: "Avançado",
          badgeStyle: "bg-red-400",
          textColor: "text-red-600",
          opacity: 1,
        };
      case "pending":
        return {
          badgeText: "Iniciar",
          badgeStyle: "bg-blue-500",
          textColor: "text-blue-600",
          opacity: 1,
        };
      case "fácil":
        return {
          badgeText: "Fácil",
          badgeStyle: "bg-green-100",
          textColor: "text-green-700",
          opacity: 1,
        };
      case "médio":
        return {
          badgeText: "Médio",
          badgeStyle: "bg-yellow-100",
          textColor: "text-yellow-700",
          opacity: 1,
        };
      case "difícil":
        return {
          badgeText: "Difícil",
          badgeStyle: "bg-red-100",
          textColor: "text-red-700",
          opacity: 1,
        };
      default:
        return {
          badgeText: "Iniciar",
          badgeStyle: "bg-blue-500",
          textColor: "text-blue-600",
          opacity: 1,
        };
    }
  };

  const statusConfig = getStatusConfig(status);
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
        <Text
          className="text-lg font-semibold mb-1 text-textPrimary"
        >
          {title}
        </Text>

        <Text
          className="text-textPrimary text-sm mb-1"
          numberOfLines={3}
        >
          {description}
        </Text>

        <Text className="text-textSecondary text-sm font-medium mb-2">
          Duração: {duration}
        </Text>

        <View
          className={`px-2 py-1 rounded-full ${statusConfig.badgeStyle}`}
        >
          <Text className={`text-sm font-semibold ${statusConfig.textColor}`}>
            {statusConfig.badgeText}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseListItem;