import { supabase } from "@/lib/supabase";
import { TriagemItem, UserStats } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

interface DashboardData {
  userStats: UserStats;
  triagemHistory: TriagemItem[];
  isFirstAccess: boolean;
}

const fetchDashboardData = async (): Promise<DashboardData> => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new Error("Erro ao buscar dados do usuário");
  }

  const userId = userData.user.id;

  const { data: triagemData, error: triagemError } = await supabase
    .from("triagens")
    .select("id, created_at, type, status")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (triagemError) {
    throw new Error("Erro ao buscar triagens");
  }

  const formattedTriagemHistory = await Promise.all(
    (triagemData || []).map(async (triagem) => {
      let location = "";

      if (triagem.type === "pain") {
        const { data: painData } = await supabase
          .from("pain_symptoms")
          .select("dor_com_mais_freq")
          .eq("triagem_id", triagem.id)
          .single();

        location = painData?.dor_com_mais_freq || "Dor";
      } else if (triagem.type === "mental") {
        const { data: mentalData } = await supabase
          .from("mental_health_symptoms")
          .select("como_esta_sentindo")
          .eq("triagem_id", triagem.id)
          .single();

        location = mentalData?.como_esta_sentindo || "Saúde Mental";
      }

      const { data: exercisesData } = await supabase
        .from("user_exercises")
        .select("completed")
        .eq("triagem_id", triagem.id)
        .eq("user_id", userId);

      const total = exercisesData?.length || 1;
      const completed = exercisesData?.filter((ex) => ex.completed).length || 1;

      return {
        id: triagem.id,
        date: triagem.created_at,
        type: triagem.type === "pain" ? "Dor" : "Saúde Mental",
        location,
        progress: { completed, total },
        status: triagem.status || "Em andamento",
      };
    })
  );

  const { data: completedExercises } = await supabase
    .from("user_exercises")
    .select("completion_date")
    .eq("user_id", userId)
    .eq("completed", true);

  const consecutiveDays = calculateConsecutiveDays(completedExercises || []);

  const userStats: UserStats = {
    id: userId,
    name: userData.user.user_metadata.name || "Usuário",
    exercisesDone: completedExercises?.length || 0,
    triagemCount: formattedTriagemHistory.length,
    consecutiveDays,
    lastTriagem: formattedTriagemHistory[0]?.date,
  };

  return {
    userStats,
    triagemHistory: formattedTriagemHistory,
    isFirstAccess: formattedTriagemHistory.length === 0,
  };
};

const calculateConsecutiveDays = (
  completedExercises: { completion_date: string | null }[]
): number => {
  if (!completedExercises.length) return 0;

  const uniqueDates = new Set<string>();
  completedExercises.forEach((ex) => {
    if (ex.completion_date) {
      uniqueDates.add(new Date(ex.completion_date).toDateString());
    }
  });

  const today = new Date();
  let consecutiveDays = 0;

  for (let i = 0; i < 30; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);

    if (uniqueDates.has(checkDate.toDateString())) {
      consecutiveDays++;
    } else if (i > 0) {
      break;
    }
  }

  return consecutiveDays;
};

export const useDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard-data"],
    queryFn: fetchDashboardData,
    retry: 3,
  });
};
