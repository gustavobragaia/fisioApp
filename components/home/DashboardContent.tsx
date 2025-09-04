import { CurrentProgressCard } from "@/components/home/CurrentProgressCard";
import { HowAreYouFeeling } from "@/components/home/HowAreYouFeeling";
import { TriagemHistorySection } from "@/components/home/TriagemHistorySection";
import { WellnessCardsSection } from "@/components/home/WellnessCardsSection";
import { supabase } from "@/lib/supabase";
import { TriagemItem, UserStats } from "@/types/dashboard";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { DashboardHeader } from "./DashboardHeader";

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
  const router = useRouter();

  const [hasAnsweredToday, setHasAnsweredToday] = useState<boolean | null>(
    null
  );

  const checkAnsweredToday = async () => {
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from("emotion_user")
      .select("id")
      .eq("user_id", userStats.id)
      .eq("date", today)
      .limit(1)
      .single();

    if (error) {
      // console.error("Erro ao verificar resposta de hoje:", error);
      setHasAnsweredToday(false);
      return;
    }

    setHasAnsweredToday(!!data);
  };

  useEffect(() => {
    if (userStats?.id) {
      checkAnsweredToday();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStats]);

  const handleWellnessCardPress = (cardId: string) => {
    router.push({
      pathname: "/(tabs)/(triagem)/(mental)",
      params: {
        preSelectedQuestion: cardId,
      },
    });
  };

  if (hasAnsweredToday === null) {
    return null;
  }

  const currentTriagem = triagemHistory[0];

  const isCurrentTriagemCompleted =
    currentTriagem && currentTriagem?.status === "completed";

  return (
    <ScrollView className="flex-1 bg-background">
      <DashboardHeader userStats={userStats} />

      {!hasAnsweredToday && (
        <View className="mx-6 flex-1">
          <HowAreYouFeeling userId={userStats.id} />
        </View>
      )}
      {/*
      <HorizontalCardSection
        title="Feito para sua rotina"
        type="mental"
        data={mockRoutine}
      /> */}

      <WellnessCardsSection onCardPress={handleWellnessCardPress} />

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
}
