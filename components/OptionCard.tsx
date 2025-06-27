import colors from "@/styles/colors";
import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  icon: ReactNode;
  title: string;
  cardWidth?: number;
  value?: string | number;
  selectedValue?: string | number;
  onPress?: () => void;
}

export function OptionCard({
  icon,
  title,
  cardWidth,
  value,
  selectedValue,
  onPress,
  ...props
}: Props) {
  const isSelected = value && selectedValue && value === selectedValue;

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      className="min-h-[108px] p-4 bg-white shadow-[0_3px_30px_rgba(16,16,16,0.03)] rounded-xl justify-between border"
      style={{
        width: cardWidth,
        borderColor: isSelected ? colors.primary : "transparent",
      }}
      activeOpacity={0.9}
      onPress={handlePress}
      {...props}
    >
      {icon}
      <Text
        className="font-semibold text-base mt-4 line-clamp-2"
        style={{ color: isSelected ? colors.primary : colors.textPrimary }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
