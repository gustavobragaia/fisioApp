import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import colors from "@/styles/colors";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends Omit<TouchableOpacityProps, "style"> {
  title: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  Icon?: React.ComponentType<{ size?: number; color?: string }>;
  iconPosition?: "left" | "right";
}

export function Button({
  title,
  variant = "primary",
  disabled = false,
  loading = false,
  onPress,
  Icon,
  iconPosition = "left",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const getButtonClasses = () => {
    let base = "flex-row items-center justify-center rounded-xl px-6 h-14";
    if (variant === "primary") {
      base += " bg-primary";
    } else if (variant === "secondary") {
      base += " bg-greenLight";
    }
    if (isDisabled) {
      base += " opacity-60";
    }
    return base;
  };

  const getTextClasses = () => {
    let base = "font-semibold text-base text-center";
    if (variant === "primary") {
      base += " text-white";
    } else if (variant === "secondary") {
      base += " text-primary";
    }
    return base;
  };

  const getLoadingColor = () =>
    variant === "primary" ? "#FFFFFF" : colors.primary;
  const getIconColor = () =>
    variant === "primary" ? "#FFFFFF" : colors.primary;

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={getLoadingColor()}
          style={{ marginHorizontal: 4 }}
        />
      );
    }

    const iconElement = Icon ? <Icon size={20} color={getIconColor()} /> : null;
    const textElement = (
      <Text className={getTextClasses()} numberOfLines={1}>
        {title}
      </Text>
    );

    if (!Icon) {
      return textElement;
    }

    return (
      <View className="flex-row items-center">
        {iconPosition === "left" && iconElement}
        {iconPosition === "left" && <View style={{ width: 8 }} />}
        {textElement}
        {iconPosition === "right" && <View style={{ width: 8 }} />}
        {iconPosition === "right" && iconElement}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={{ backgroundColor: colors.primary }}
      {...props}
      className={getButtonClasses() + " " + props?.className}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}
