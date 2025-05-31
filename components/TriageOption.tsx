import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface TriageOptionProps {
  title: string;
  icon: React.ReactNode;
  backgroundColor: string;
  onPress: () => void;
}

const TriageOption: React.FC<TriageOptionProps> = ({
  title,
  icon,
  backgroundColor,
  onPress
}) => {
  return (
    <TouchableOpacity
      className="rounded-3xl mb-4 overflow-hidden"
      style={{ backgroundColor }}
      onPress={onPress}
    >
      <View className="p-6 items-center">
        {icon}
        <Text className="text-white text-center font-medium mt-2 text-lg">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TriageOption;
