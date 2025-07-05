import React from "react";
import { Dimensions, View } from "react-native";

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export function ProgressIndicator({
  totalSteps,
  currentStep,
}: ProgressIndicatorProps) {
  const screenWidth = Dimensions.get("window").width;
  const containerPadding = 24;
  const dotMargin = 12;
  const totalMargins = (totalSteps - 1) * dotMargin;
  const availableWidth = screenWidth - containerPadding - totalMargins;
  const dotWidth = availableWidth / totalSteps;

  return (
    <View className="flex-row justify-center items-center mt-8 mb-6 px-4 gap-1">
      {Array.from({ length: totalSteps }, (_, index) => (
        <View
          key={index}
          className={`h-2 rounded-full mx-0.5 ${
            index === currentStep ? "bg-primary" : "bg-paleSand"
          }`}
          style={{ width: dotWidth }}
        />
      ))}
    </View>
  );
}
