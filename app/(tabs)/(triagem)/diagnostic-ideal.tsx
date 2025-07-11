import { ResultDiagnostic } from '@/components/diagnostic/ResultDiagnostic';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function DiagnosticResultScreen() {
  const params = useLocalSearchParams();

  const type = params.type || 'pain';
  const triagemId = params.triagemId || params.id;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ResultDiagnostic
        type={type === 'mental' ? 'mental' : 'pain'}
        triagemId={String(triagemId)}
      />
    </SafeAreaView>
  );
}
