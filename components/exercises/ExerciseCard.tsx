import colors from "@/styles/colors";
import { useRouter } from "expo-router";
import { ArrowRight2 } from "iconsax-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export interface ExerciseCardProps {
  title: string;
  exerciseCount: number;
  description?: string;
  variant?: "primary" | "secondary";
  onPress?: () => void;
  onStartPress?: () => void;
  href?: string;
  disabled?: boolean;
}

export const ExerciseCard = ({
  title,
  exerciseCount,
  description,
  variant = "secondary",
  onPress,
  onStartPress,
  href,
  disabled = false,
}: ExerciseCardProps) => {
  const router = useRouter();

  const handleCardPress = () => {
    if (disabled) return;
    
    if (href) {
      router.push(href as any);
    } else if (onPress) {
      onPress();
    }
  };

  const handleStartPress = () => {
    if (disabled) return;
    
    if (onStartPress) {
      onStartPress();
    }
  };

  const getCardStyles = () => {
    const baseStyles = "rounded-xl p-4 mb-3 shadow-sm flex-row justify-between items-center";
    
    if (variant === "primary") {
      return `${baseStyles} bg-primary ${disabled ? "opacity-50" : ""}`;
    }
    
    return `${baseStyles} bg-white ${disabled ? "opacity-50" : ""}`;
  };

  const getTitleColor = () => {
    return variant === "primary" ? "text-white" : "text-gray-900";
  };

  const getSubtitleColor = () => {
    return variant === "primary" ? "text-white/80" : "text-gray-500";
  };

  const getStartButtonStyles = () => {
    if (variant === "primary") {
      return "bg-white text-primary";
    }
    return "bg-green-100 text-green-700";
  };

  const getArrowColor = () => {
    return variant === "primary" ? colors.textPrimary : colors.primary;
  };

  return (
    <TouchableOpacity
      className={getCardStyles()}
      onPress={handleCardPress}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <View className="flex-1">
        <Text className={`font-semibold text-lg mb-1 ${getTitleColor()}`}>
          {title}
        </Text>
        <Text className={`text-sm ${getSubtitleColor()}`}>
          {exerciseCount} exercício{exerciseCount !== 1 ? 's' : ''}
        </Text>
        {description && (
          <Text className={`text-sm mt-1 ${getSubtitleColor()}`}>
            {description}
          </Text>
        )}
      </View>

      <View className="flex-row items-center">
        <TouchableOpacity
          className={`px-4 py-2 rounded-full mr-3 ${getStartButtonStyles()}`}
          onPress={handleStartPress}
          disabled={disabled}
        >
          <Text className={`text-sm font-medium ${getStartButtonStyles().split(' ')[1]}`}>
            Iniciar
          </Text>
        </TouchableOpacity>

        <View className={`rounded-full w-8 h-8 items-center justify-center bg-[#F8F8FE]`}>
          <ArrowRight2 
            size={16} 
            color={getArrowColor()} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};