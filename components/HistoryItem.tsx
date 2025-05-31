import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import colors from '../styles/colors';

interface DiagnosticItem {
  id: string;
  date: string;
  title: string;
  painLevel: number;
  status: string;
}

interface HistoryItemProps {
  diagnostic: DiagnosticItem;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const getPainLevelColor = (level: number) => {
  if (level <= 3) return 'bg-green-500';
  if (level <= 6) return 'bg-yellow-500';
  return 'bg-red-500';
};

const HistoryItem: React.FC<HistoryItemProps> = ({ diagnostic }) => {
  const handlePress = () => {
    // Navigate to diagnostic details
    // Using params to pass the diagnostic ID to the detail page
    router.push({
      pathname: '/(tabs)/(triagem)/diagnostic-ideal',
      params: { id: diagnostic.id, fromHistory: 'true' }
    });
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-lg p-4 mb-3 shadow-sm"
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-textPrimary text-base font-medium">{diagnostic.title}</Text>
        <Text className="text-gray-500 text-sm">{formatDate(diagnostic.date)}</Text>
      </View>
      
      <View className="flex-row items-center mt-2">
        <Text className="text-gray-500 mr-2">Nível de dor:</Text>
        <View className={`w-6 h-6 rounded-full items-center justify-center ${getPainLevelColor(diagnostic.painLevel)}`}>
          <Text className="text-white text-xs font-bold">{diagnostic.painLevel}</Text>
        </View>
      </View>
      
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-gray-500">Status: {diagnostic.status}</Text>
        <View className="bg-[#CDEFE8] px-3 py-1 rounded-full">
          <Text className="text-[#4A6FA5] text-xs">Ver detalhes</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryItem;
