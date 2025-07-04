import { CurrentProgressCard } from '@/components/home/CurrentProgressCard';
import { FirstAccessDashboard } from '@/components/home/FirstAccessDashboard';
import { HorizontalCardSection } from '@/components/home/HorizontalCardSection';
import { TriagemHistorySection } from '@/components/home/TriagemHistorySection';
import { mockRoutine, mockWhereYouFeelPain } from '@/constants/mockData';
import { TriagemItem, UserStats } from '@/types/dashboard';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DashboardHeader } from './DashboardHeader';

interface DashboardContentProps {
  userStats: UserStats;
  triagemHistory: TriagemItem[];
  isFirstAccess: boolean;
}

export function DashboardContent({
  userStats,
  triagemHistory,
  isFirstAccess,
}: DashboardContentProps) {
  const currentTriagem = triagemHistory[0];
  const isCurrentTriagemCompleted = currentTriagem &&
    currentTriagem.progress.completed >= currentTriagem.progress.total;

  return (
    <ScrollView className="flex-1 bg-background">
      <DashboardHeader userStats={userStats} />

      {isFirstAccess && (
        <View className="mx-6">
          <FirstAccessDashboard />
        </View>
      )}

      <HorizontalCardSection
        title="Feito para sua rotina"
        data={mockRoutine}
      />
      <HorizontalCardSection
        title="Onde você sente mais dor?"
        data={mockWhereYouFeelPain}
      />

      <View className="flex-1 px-6 mb-60">
        {!isFirstAccess && triagemHistory.length > 0 && (
          <>
            {currentTriagem && !isCurrentTriagemCompleted && (
              <CurrentProgressCard triagem={currentTriagem} />
            )}

            <View className="flex-1 my-6">
              <Text className="font-semibold text-textPrimary text-xl mb-4">
                Histórico de Triagens
              </Text>
              <TriagemHistorySection triagemHistory={triagemHistory} />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};
