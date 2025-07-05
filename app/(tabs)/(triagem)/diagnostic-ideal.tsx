import { ResultDiagnostic } from '@/components/diagnostic/ResultDiagnostic';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function DiagnosticResultScreen() {
  const { type = 'pain', triagemId } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      <ResultDiagnostic
        type={type === 'mental' ? 'mental' : 'pain'}
        triagemId={String(triagemId)}
      />
    </SafeAreaView>
  );
}
