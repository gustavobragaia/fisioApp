import { EmptyState } from "@/components/EmptyState";
import { Loading } from "@/components/Loading";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import BackHeader from "../../../../components/BackHeader";
import ExerciseGroupList, {
  Exercise,
} from "../../../../components/ExerciseGroupList";
import { RecommendedExercises } from "../../../../components/RecommendedExercises";
import { supabase } from "../../../../lib/supabase";

export default function ExerciseCategoryScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [exercisesLoading, setExercisesLoading] = useState(true);
  const [showRecommended, setShowRecommended] = useState(false);

  const params = useLocalSearchParams<{
    categoryName?: string;
    categoryType?: string;
    exercises?: string;
    isRecommended?: string;
    goToExerciseIndex?: string;
    timestamp?: string;
    triagemId?: string;
  }>();

  const [dbExercises, setDbExercises] = useState<Exercise[]>([]);

  const exercises: Exercise[] = React.useMemo(() => {
    try {
      if (params.exercises) {
        return JSON.parse(params.exercises);
      }
      return [];
    } catch (error) {
      console.error("Error parsing exercises:", error);
      return [];
    }
  }, [params.exercises]);

  const mapDifficultyToComponent = (difficulty: string): "fácil" | "médio" | "difícil" => {
    switch (difficulty?.toLowerCase()) {
      case "iniciante":
      case "easy":
        return "fácil";
      case "intermediário":
      case "intermediario":
      case "medium":
        return "médio";
      case "avançado":
      case "avancado":
      case "hard":
        return "difícil";
      default:
        return "médio";
    }
  };

  useEffect(() => {
    const fetchExercisesFromDb = async () => {
      if (params.triagemId && params.categoryType) {
        setExercisesLoading(true);
        try {
          console.log("Fetching exercises with:", {
            triagemId: params.triagemId,
            categoryType: params.categoryType,
          });

          // Buscar exercícios por group_type ao invés de group_id
          const { data: groupExercises, error: groupExError } = await supabase
            .from("exercises")
            .select("*")
            .eq("id", params.categoryType)
            .eq("is_published", true);

          if (groupExError) {
            console.error("Error fetching group exercises:", groupExError);
            return;
          }

          console.log(
            `Found ${groupExercises?.length || 0} exercises in group_type ${
              params.categoryType
            }`
          );

          if (groupExercises && groupExercises.length > 0) {
            const formattedExercises: Exercise[] = groupExercises.map((ex) => ({
              id: ex.id,
              name: ex.name,
              description: ex.description || "",
              imageUrl: ex.thumbnail_url || "https://placehold.co/150x150",
              videoUrl: ex.video_url,
              steps: ex.steps || [],
              duration: ex.duration ? `${ex.duration} segundos` : "30 segundos",
              difficulty: mapDifficultyToComponent(ex.difficulty || "medium"),
              groupId: ex.group_type, // Usar group_type como groupId
            }));

            setDbExercises(formattedExercises);
          } else {
            console.log(
              "No exercises found for this group_type, trying to find any exercises for this triagem"
            );

            const { data: userExercises, error: userExError } = await supabase
              .from("user_exercises")
              .select("exercise_id")
              .eq("triagem_id", params.triagemId);

            if (userExError) {
              console.error("Error fetching user exercises:", userExError);
              return;
            }

            console.log(
              `Found ${userExercises?.length || 0} user exercises for triagem ${
                params.triagemId
              }`
            );

            if (userExercises && userExercises.length > 0) {
              const exerciseIds = userExercises.map((ue) => ue.exercise_id);

              const { data: exercises, error: exError } = await supabase
                .from("exercises")
                .select("*")
                .in("id", exerciseIds)
                .eq("is_published", true);

              if (exError) {
                console.error("Error fetching exercises:", exError);
                return;
              }

              if (exercises && exercises.length > 0) {
                // Agrupar por group_type ao invés de group_id
                const exercisesByGroup: Record<string, any[]> = {};

                exercises.forEach((ex) => {
                  if (!exercisesByGroup[ex.group_type]) {
                    exercisesByGroup[ex.group_type] = [];
                  }
                  exercisesByGroup[ex.group_type].push(ex);
                });

                // Tentar encontrar exercícios do grupo específico ou usar o primeiro grupo disponível
                const groupExercises =
                  exercisesByGroup[params.categoryType] ||
                  exercises.filter(
                    (ex) => ex.group_type === Object.keys(exercisesByGroup)[0]
                  ) ||
                  exercises;

                const formattedExercises: Exercise[] = groupExercises.map(
                  (ex) => ({
                    id: ex.id,
                    name: ex.name,
                    description: ex.description || "",
                    imageUrl:
                      ex.thumbnail_url || "https://placehold.co/150x150",
                    videoUrl: ex.video_url,
                    steps: ex.steps || [],
                    duration: ex.duration
                      ? `${ex.duration} segundos`
                      : "30 segundos",
                    difficulty: mapDifficultyToComponent(ex.difficulty || "medium"),
                    groupId: ex.group_type, // Usar group_type como groupId
                  })
                );

                setDbExercises(formattedExercises);
              }
            }
          }
        } catch (error) {
          console.error("Error in fetchExercisesFromDb:", error);
        } finally {
          setExercisesLoading(false);
        }
      } else {
        setExercisesLoading(false);
      }
    };

    fetchExercisesFromDb();
  }, [params.triagemId, params.categoryType]);

  const mappedParamExercises: Exercise[] = React.useMemo(() => {
    return exercises.map((ex: any) => ({
      ...ex,
      difficulty: mapDifficultyToComponent(ex.difficulty || "medium"),
      groupId: ex.group_type || ex.tipo, // Mapear group_type ou tipo para groupId
    }));
  }, [exercises]);

  const displayExercises =
    mappedParamExercises.length > 0 ? mappedParamExercises : dbExercises;

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
      } catch (error) {
        console.error("Error checking user session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (params.isRecommended === "true") {
      setShowRecommended(true);
    } else {
      setShowRecommended(false);
    }
  }, [params.isRecommended]);

  React.useEffect(() => {
    if (params.goToExerciseIndex && displayExercises.length > 0 && !exercisesLoading) {
      const index = parseInt(params.goToExerciseIndex, 10);
      if (!isNaN(index) && index >= 0 && index < displayExercises.length) {
        handleExercisePress(displayExercises[index], index);
      }
    }
  }, [params.goToExerciseIndex, displayExercises, exercisesLoading]);

  if (loading || exercisesLoading) {
    return <Loading />;
  }

  if (displayExercises.length === 0 && !exercisesLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 p-4">
          <BackHeader
            title={params.categoryName || "Exercícios"}
            onBackPress={() => router.back()}
          />
          <EmptyState
            title="Nenhum exercício disponível para esta categoria."
            variant="sad"
          />
        </View>
      </SafeAreaView>
    );
  }

  const handleExercisePress = (exercise: Exercise, index: number) => {
    const durationInSeconds = parseDurationToSeconds(exercise.duration);

    router.push({
      pathname: "/(tabs)/(triagem)/(exercises)/single-exercise",
      params: {
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        exerciseVideoUrl: exercise.videoUrl,
        exerciseSteps: JSON.stringify(exercise.steps),
        exerciseDuration: durationInSeconds.toString(),
        exerciseIndex: index.toString(),
        totalExercises: displayExercises.length.toString(),
        groupId: params.categoryType, // Usar categoryType ao invés de categoryName
        triagemId: params.triagemId,
      },
    });
  };

  const parseDurationToSeconds = (durationStr: string): number => {
    try {
      const match = durationStr.match(/\d+/);
      if (!match) return 30;

      const value = parseInt(match[0], 10);

      if (durationStr.includes("minuto")) {
        return value * 60;
      }

      return Math.min(value, 30);
    } catch (error) {
      console.error("Error parsing duration:", error);
      return 30;
    }
  };

  const handleRecommendationsComplete = () => {
    router.push({
      pathname: "/(tabs)/(triagem)/diagnostic-ideal",
      params: {
        message: "Parabéns! Você completou todos os exercícios recomendados.",
      },
    });
  };

  console.log("displayExercises structure:", displayExercises);
  if (displayExercises.length > 0) {
    console.log("First exercise:", displayExercises[0]);
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {showRecommended && user ? (
        <View className="flex-1">
          <ScrollView className="flex-1 p-4">
            <BackHeader
              title="Exercícios Recomendados"
              subtitle="Baseados na sua avaliação"
            />
            <RecommendedExercises
              userId={user.id}
              triagemId={params.triagemId}
              onComplete={handleRecommendationsComplete}
            />
          </ScrollView>
        </View>
      ) : (
        <ScrollView className="flex-1 p-6 pt-12">
          <BackHeader
            title={params.categoryName || "Categoria de Exercícios"}
            subtitle={"Exercícios"}
          />
          <ExerciseGroupList
            exercises={displayExercises}
            onExercisePress={handleExercisePress}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
