import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

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
  const pressAnimation = useSharedValue(0);
  const opacityAnimation = useSharedValue(1);

  React.useEffect(() => {
    opacityAnimation.value = withTiming(disabled || loading ? 0.6 : 1, {
      duration: 200,
    });
  }, [disabled, loading, opacityAnimation]);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(pressAnimation.value, [0, 1], [1, 0.98]);

    return {
      transform: [{ scale }],
      opacity: opacityAnimation.value,
    };
  });

  const handlePressIn = () => {
    if (!disabled && !loading) {
      pressAnimation.value = withTiming(1, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    if (!disabled && !loading) {
      pressAnimation.value = withTiming(0, { duration: 100 });
    }
  };

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle = styles.button;

    let variantStyle: ViewStyle = {};

    switch (variant) {
      case "primary":
        variantStyle = {
          backgroundColor: colors.primary,
        };
        break;
      case "secondary":
        variantStyle = {
          backgroundColor: colors.greenLight,
        };
        break;
    }

    return {
      ...baseStyle,
      ...variantStyle,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle = styles.buttonText;

    let variantTextStyle: TextStyle = {};

    switch (variant) {
      case "primary":
        variantTextStyle = {
          color: "#FFFFFF",
        };
        break;
      case "secondary":
        variantTextStyle = {
          color: colors.primary,
        };
        break;
    }

    return {
      ...baseStyle,
      ...variantTextStyle,
    };
  };

  const getLoadingColor = () => {
    return variant === "primary" ? "#FFFFFF" : colors.primary;
  };

  const getIconColor = () => {
    return variant === "primary" ? "#FFFFFF" : colors.primary;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={getLoadingColor()}
          style={styles.loadingIndicator}
        />
      );
    }

    const iconElement = Icon ? <Icon size={20} color={getIconColor()} /> : null;

    const textElement = (
      <Text style={getTextStyle()} numberOfLines={1}>
        {title}
      </Text>
    );

    if (!Icon) {
      return textElement;
    }

    return (
      <>
        {iconPosition === "left" && iconElement}
        {iconPosition === "left" && <Text style={styles.iconSpacing} />}
        {textElement}
        {iconPosition === "right" && <Text style={styles.iconSpacing} />}
        {iconPosition === "right" && iconElement}
      </>
    );
  };

  return (
    <AnimatedTouchableOpacity
      style={[animatedStyle, getButtonStyle()]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {renderContent()}
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingHorizontal: 24,
    height: 56,
  },
  buttonText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  loadingIndicator: {
    marginHorizontal: 4,
  },
  iconSpacing: {
    width: 8,
  },
});
