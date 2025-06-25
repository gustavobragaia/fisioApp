import { CurrentProgressCard } from "@/components/home/CurrentProgressCard";
import { DashboardHeader } from "@/components/home/DashboardHeader";
import { FirstAccessDashboard } from "@/components/home/FirstAccessDashboard";
import { HorizontalCardSection } from "@/components/home/HorizontalCardSection";
import { TriagemHistorySection } from "@/components/home/TriagemHistorySection";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
// import { supabase } from "../../lib/supabase";

export interface TriagemItem {
  id: string;
  date: string;
  type: string;
  location: string;
  groupId: string;
  progress: { completed: number; total: number };
  status: string;
}

export type UserStats = {
  exercisesDone: number;
  triagemCount: number;
  consecutiveDays: number;
  lastTriagem?: string;
  name: string;
};

const mockTriagemHistory: TriagemItem[] = [
  {
    id: "1",
    location: "Lombar",
    date: "2025-06-15",
    progress: { completed: 4, total: 8 },
    type: "Dor",
    groupId: "lombar",
    status: "Em andamento",
  },
  {
    id: "2",
    location: "Joelhos",
    date: "2025-06-15",
    progress: { completed: 2, total: 8 },
    type: "Dor",
    groupId: "joelhos",
    status: "Em andamento",
  },
  {
    id: "3",
    location: "Ombros",
    date: "2025-06-15",
    progress: { completed: 3, total: 6 },
    type: "Dor",
    groupId: "ombros",
    status: "Em andamento",
  },
];

const mockUserStats: UserStats = {
  exercisesDone: 12,
  triagemCount: 3,
  consecutiveDays: 5,
  name: "Gustavo",
};

export default function Dashboard() {
  const [isFirstAccess, setIsFirstAccess] = useState<boolean>(false);
  const [userStats, setUserStats] = useState<UserStats>(mockUserStats);
  const [triagemHistory, setTriagemHistory] =
    useState<TriagemItem[]>(mockTriagemHistory);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO login is working
    // fetchData();

    // Mock data setup for development
    setIsFirstAccess(false);
    setUserStats(mockUserStats);
    setTriagemHistory(mockTriagemHistory);
    setIsLoading(false);
  }, []);

  /*
  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Get current user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        console.error("Error fetching user:", userError);
        setIsLoading(false);
        return;
      }

      const userId = userData.user.id;

      // Get user data
      const { data: userData2, error: userDataError } = await supabase
        .from("users")
        .select("name")
        .eq("id", userId)
        .single();

      // Get user's triagens
      const { data: triagemData, error: triagemError } = await supabase
        .from("triagens")
        .select("id, created_at, type, status")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      // Process and format data...
      // (Rest of the data fetching logic)
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  */

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <DashboardHeader userStats={userStats} />

      {true && (
        <View className="mx-6">
          <FirstAccessDashboard />
        </View>
      )}

      <HorizontalCardSection title="Feito para a sua rotina" />
      <HorizontalCardSection title="Onde você sente mais dor?" />

      <View className="flex-1 px-6">
        {!isFirstAccess && (
          <>
            {triagemHistory.length > 0 && (
              <CurrentProgressCard triagem={triagemHistory[0]} />
            )}
            <TriagemHistorySection triagemHistory={triagemHistory} />
          </>
        )}
      </View>
    </ScrollView>
  );
}
