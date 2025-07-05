import React from "react";
import { Text } from "react-native";

interface FormHeaderProps {
  title: string;
  subtitle: string;
}

export function FormHeader({ title, subtitle }: FormHeaderProps) {
  return (
    <>
      <Text className="text-3xl font-bold text-textPrimary">
        {title}
      </Text>
      <Text className="text-lg text-slate-600 mt-2 mb-8">
        {subtitle}
      </Text>
    </>
  );
}
