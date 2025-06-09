import React from 'react';
import { SafeAreaView, View } from 'react-native';
import ResultDiagnostic from '../../../components/ResultDiagnostic';
import { useLocalSearchParams } from 'expo-router';

type DiagnosticResultParams = {
  type?: string;
  id?: string; // Add triagem ID parameter
};

export default function DiagnosticResultScreen() {
  // Get parameters from the route
  const { type = 'pain', id } = useLocalSearchParams<DiagnosticResultParams>();
  
  console.log('DiagnosticResultScreen received params:', { type, id });
  
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <View className="flex-1 w-full h-full p-0">
        <ResultDiagnostic 
          type={type === 'mental' ? 'mental' : 'pain'} 
          triagemId={id} // Pass the triagem ID to ResultDiagnostic
        />
      </View>
    </SafeAreaView>
  );
}
