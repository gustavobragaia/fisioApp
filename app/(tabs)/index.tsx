import { DashboardContent } from '@/components/home/DashboardContent';
import { DashboardError } from '@/components/home/DashboardError';
import { DashboardHeader } from '@/components/home/DashboardHeader';
import { Loading } from '@/components/Loading';
import { useDashboardData } from '@/hooks/useDashboardData';
import React from 'react';

export default function Dashboard() {
  const {
    data,
    isLoading,
    isError,
    refetch
  } = useDashboardData();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <DashboardError onRetry={refetch} />;
  }

  const { userStats, triagemHistory, isFirstAccess } = data;

  return (
    <>
      <DashboardHeader userStats={userStats} />
      <DashboardContent
        userStats={userStats}
        triagemHistory={triagemHistory}
        isFirstAccess={isFirstAccess}
      />
    </>
  );
};
