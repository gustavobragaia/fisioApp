import { CurrentProgressCard } from "@/components/home/CurrentProgressCard";
import { DashboardHeader } from "@/components/home/DashboardHeader";
import { FirstAccessDashboard } from "@/components/home/FirstAccessDashboard";
import { HorizontalCardSection } from "@/components/home/HorizontalCardSection";
import { TriagemHistorySection } from "@/components/home/TriagemHistorySection";
import colors from "@/styles/colors";
import {
  Activity,
  ArrowSquareLeft,
  Health,
  Heart,
  Location,
  Profile,
  User
} from "iconsax-react-native";
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
  painLevel?: "Alta" | "Média" | "Baixa";
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
    location: "Triagem -Lombar",
    date: "2025-06-15",
    progress: { completed: 4, total: 8 },
    type: "progress",
    groupId: "lombar",
    status: "Em andamento",
  },
  {
    id: "2",
    location: "Triagem -Joelhos",
    date: "2025-06-15",
    progress: { completed: 2, total: 8 },
    type: "progress",
    groupId: "joelhos",
    status: "Em andamento",
  },
  {
    id: "3",
    location: "Triagem -Ombros",
    date: "2025-06-15",
    progress: { completed: 3, total: 6 },
    type: "progress",
    groupId: "ombros",
    status: "Em andamento",
  },
];

const mockRoutine = [
  {
    icon: <Heart size={24} color={colors.primary} />,
    title: "Dores no corpo"
  },
  {
    icon: <Health size={24} color={colors.primary} />,
    title: "Ansiedade e cansaço"
  },
  {
    icon: <Activity size={24} color={colors.primary} />,
    title: "Exercícios"
  },
  {
    icon: <Profile size={24} color={colors.primary} />,
    title: "Meditação e relaxamento"
  },
  {
    icon: <Heart size={24} color={colors.primary} />,
    title: "Alongamentos matinais"
  },
  {
    icon: <Activity size={24} color={colors.primary} />,
    title: "Respiração profunda"
  },
]

const mockWhereYouFeelPain = [
  {
    icon: <User size={24} color={colors.primary} />,
    title: "Pescoço"
  },
  {
    icon: <ArrowSquareLeft size={24} color={colors.primary} />,
    title: "Lombar"
  },
  {
    icon: <Location size={24} color={colors.primary} />,
    title: "Tornozelos / Pés"
  },
  {
    icon: <User size={24} color={colors.primary} />,
    title: "Cabeça / Enxaqueca"
  },
  {
    icon: <Heart size={24} color={colors.primary} />,
    title: "Ombros"
  },
  {
    icon: <Location size={24} color={colors.primary} />,
    title: "Joelhos"
  },
]
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

      {isFirstAccess && (
        <View className="mx-6">
          <FirstAccessDashboard />
        </View>
      )}

      <HorizontalCardSection title="Feito para sua rotina" data={mockRoutine} />
      <HorizontalCardSection title="Onde você sente mais dor?" data={mockWhereYouFeelPain} />

      <View className="flex-1 px-6">
        {!isFirstAccess && (
          <>
            {triagemHistory.length > 0 && (
              <CurrentProgressCard triagem={triagemHistory[0]} />
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
