import colors from "@/styles/colors";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  length: number;
  currentIndex: number;
  onDotPress: (index: number) => void;
};

const PaginationDot = ({
  index,
  currentIndex,
  onDotPress,
}: {
  index: number;
  currentIndex: number;
  onDotPress: (index: number) => void;
}) => {
  const dotStyle = useAnimatedStyle(() => {
    const isActive = currentIndex === index;
    const width = withTiming(isActive ? 32 : 12, { duration: 300 });
    const backgroundColor = withTiming(
      isActive ? colors.primary : colors.secondary,
      { duration: 300 }
    );

    return {
      width,
      backgroundColor,
    };
  });

  return (
    <Pressable onPress={() => onDotPress(index)}>
      <Animated.View style={[styles.dot, dotStyle]} />
    </Pressable>
  );
};

export const PaginationElement = ({
  length,
  currentIndex,
  onDotPress,
}: Props) => {
  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <PaginationDot
          key={index}
          index={index}
          currentIndex={currentIndex}
          onDotPress={onDotPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
