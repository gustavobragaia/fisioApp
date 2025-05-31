import React from 'react';
import { SafeAreaView, View } from 'react-native';
import ResultDiagnostic from '../../../components/ResultDiagnostic';
import { useLocalSearchParams } from 'expo-router';

type DiagnosticResultParams = {
  type?: string;
};

export default function DiagnosticResultScreen() {
  // Get the type parameter from the route (defaults to 'pain' if not provided)
  const { type = 'pain' } = useLocalSearchParams<DiagnosticResultParams>();
  
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <View className="flex-1 w-full h-full p-0">
        <ResultDiagnostic type={type === 'mental' ? 'mental' : 'pain'} />
      </View>
    </SafeAreaView>
  );
}
