import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import ResultDiagnostic from '../../../components/ResultDiagnostic';

export default function DiagnosticResultScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      
      <View className="flex-1 w-full h-full p-0">
        <ResultDiagnostic />  
      </View>
      <View>

      </View>
    </SafeAreaView>
  );
}
