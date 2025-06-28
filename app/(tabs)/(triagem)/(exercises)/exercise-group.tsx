import { EmptyState } from "@/components/EmptyState";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import BackHeader from "../../../../components/BackHeader";
import ExerciseGroupList, {
  Exercise,
} from "../../../../components/ExerciseGroupList";
import RecommendedExercises from "../../../../components/RecommendedExercises";
import { supabase } from "../../../../lib/supabase";

// Exercise type is now imported from the ExerciseGroupList component

export default function ExerciseCategoryScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showRecommended, setShowRecommended] = useState(false);

  const params = useLocalSearchParams<{
    categoryName?: string;
    categoryType?: string;
    exercises?: string; // JSON stringified array of exercises
    isRecommended?: string;
    goToExerciseIndex?: string;
    timestamp?: string; // Used to force remount
    triagemId?: string; // ID of the triagem this exercise is part of
  }>();

  // State to hold exercises fetched from database
  const [dbExercises, setDbExercises] = useState<Exercise[]>([]);

  // Parse exercises from params
  const paramExercises: Exercise[] = React.useMemo(() => {
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

  // Debug state to track what's happening
  const [debugInfo, setDebugInfo] = useState<{
    triagemId?: string;
    categoryName?: string;
    userExercisesCount?: number;
    exercisesCount?: number;
    error?: string;
  }>({});

  // Fetch exercises from database if not provided in params and we have a triagemId
  useEffect(() => {
    const fetchExercisesFromDb = async () => {
      if (params.triagemId && params.categoryName) {
        setLoading(true);
        try {
          console.log("Fetching exercises with:", {
            triagemId: params.triagemId,
            categoryName: params.categoryName,
          });

          setDebugInfo({
            triagemId: params.triagemId,
            categoryName: params.categoryName,
          });

          // First get all exercises for this group_id
          const { data: groupExercises, error: groupExError } = await supabase
            .from("exercises")
            .select("*")
            .eq("group_id", params.categoryName);

          if (groupExError) {
            console.error("Error fetching group exercises:", groupExError);
            setDebugInfo((prev) => ({
              ...prev,
              error: "Error fetching group exercises: " + groupExError.message,
            }));
            return;
          }

          console.log(
            `Found ${groupExercises?.length || 0} exercises in group ${
              params.categoryName
            }`
          );
          setDebugInfo((prev) => ({
            ...prev,
            exercisesCount: groupExercises?.length || 0,
          }));

          if (groupExercises && groupExercises.length > 0) {
            // Transform to Exercise type
            const formattedExercises: Exercise[] = groupExercises.map((ex) => ({
              id: ex.id,
              name: ex.name,
              description: ex.description || "",
              imageUrl: ex.thumbnail_url || "https://via.placeholder.com/150",
              videoUrl: ex.video_url,
              steps: ex.steps || [],
              duration: ex.duration ? `${ex.duration} segundos` : "30 segundos",
              difficulty: ex.difficulty || "Intermediário",
              // Store the group_id for proper navigation
              groupId: ex.group_id,
            }));

            setDbExercises(formattedExercises);
          } else {
            // If no exercises found for this group, try to get any exercises for this triagem
            console.log(
              "No exercises found for this group, trying to find any exercises for this triagem"
            );

            const { data: userExercises, error: userExError } = await supabase
              .from("user_exercises")
              .select("exercise_id")
              .eq("triagem_id", params.triagemId);

            if (userExError) {
              console.error("Error fetching user exercises:", userExError);
              setDebugInfo((prev) => ({
                ...prev,
                error: "Error fetching user exercises: " + userExError.message,
              }));
              return;
            }

            console.log(
              `Found ${userExercises?.length || 0} user exercises for triagem ${
                params.triagemId
              }`
            );
            setDebugInfo((prev) => ({
              ...prev,
              userExercisesCount: userExercises?.length || 0,
            }));

            if (userExercises && userExercises.length > 0) {
              const exerciseIds = userExercises.map((ue) => ue.exercise_id);

              const { data: exercises, error: exError } = await supabase
                .from("exercises")
                .select("*")
                .in("id", exerciseIds);

              if (exError) {
                console.error("Error fetching exercises:", exError);
                setDebugInfo((prev) => ({
                  ...prev,
                  error: "Error fetching exercises: " + exError.message,
                }));
                return;
              }

              if (exercises && exercises.length > 0) {
                // Group exercises by group_id
                const exercisesByGroup: Record<string, any[]> = {};

                exercises.forEach((ex) => {
                  if (!exercisesByGroup[ex.group_id]) {
                    exercisesByGroup[ex.group_id] = [];
                  }
                  exercisesByGroup[ex.group_id].push(ex);
                });

                // Use exercises from the requested group if available
                const groupExercises =
                  exercisesByGroup[params.categoryName] ||
                  // Otherwise use the first group found
                  exercises.filter(
                    (ex) => ex.group_id === Object.keys(exercisesByGroup)[0]
                  ) ||
                  // Fallback to all exercises
                  exercises;

                // Transform to Exercise type
                const formattedExercises: Exercise[] = groupExercises.map(
                  (ex) => ({
                    id: ex.id,
                    name: ex.name,
                    description: ex.description || "",
                    imageUrl:
                      ex.thumbnail_url || "https://via.placeholder.com/150",
                    videoUrl: ex.video_url,
                    steps: ex.steps || [],
                    duration: ex.duration
                      ? `${ex.duration} segundos`
                      : "30 segundos",
                    difficulty: ex.difficulty || "Intermediário",
                    // Store the group_id for proper navigation
                    groupId: ex.group_id,
                  })
                );

                setDbExercises(formattedExercises);

                // Update debug info with the actual group being used
                if (formattedExercises.length > 0) {
                  setDebugInfo((prev) => ({
                    ...prev,
                    categoryName: formattedExercises[0].groupId,
                    exercisesCount: formattedExercises.length,
                  }));
                }
              }
            }
          }
        } catch (error) {
          console.error("Error in fetchExercisesFromDb:", error);
          setDebugInfo((prev) => ({
            ...prev,
            error: "Unexpected error: " + (error as Error).message,
          }));
        } finally {
          setLoading(false);
        }
      }
    };

    fetchExercisesFromDb();
  }, [params.triagemId, params.categoryName]);

  // Use exercises from params if available, otherwise use from database
  const displayExercises =
    paramExercises.length > 0 ? paramExercises : dbExercises;

  // Check user authentication status
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Check if we should show recommended exercises
  useEffect(() => {
    if (params.isRecommended === "true") {
      setShowRecommended(true);
    } else {
      setShowRecommended(false);
    }
  }, [params.isRecommended]);

  // Check if we need to navigate directly to a specific exercise
  React.useEffect(() => {
    if (params.goToExerciseIndex && displayExercises.length > 0) {
      const index = parseInt(params.goToExerciseIndex, 10);
      if (!isNaN(index) && index >= 0 && index < displayExercises.length) {
        // Navigate to the specified exercise
        handleExercisePress(displayExercises[index], index);
      }
    }
  }, [params.goToExerciseIndex, displayExercises]);

  // Show message if no exercises are available
  if (displayExercises.length === 0 && !loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 p-4">
          <BackHeader
            title={params.categoryType || "Exercícios"}
            onBackPress={() => router.back()}
          />
          <EmptyState
            title=" Nenhum exercício disponível para esta categoria."
            variant="sad"
          />
        </View>
      </SafeAreaView>
    );
  }

  // Handle exercise press
  const handleExercisePress = (exercise: Exercise, index: number) => {
    // Extract duration in seconds from the duration string (e.g., "2 minutos" -> 120)
    const durationInSeconds = parseDurationToSeconds(exercise.duration);

    // Navigate to single exercise screen
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
        groupId: params.categoryName, // Using category name as group ID for now
        triagemId: params.triagemId, // Pass the triagem ID to track exercise completion
      },
    });
  };

  // Helper function to parse duration string to seconds
  const parseDurationToSeconds = (durationStr: string): number => {
    try {
      // Extract numbers from the string
      const match = durationStr.match(/\d+/);
      if (!match) return 30; // Default to 30 seconds

      const value = parseInt(match[0], 10);

      // Check if the string contains minutes
      if (durationStr.includes("minuto")) {
        return value * 60; // Convert minutes to seconds
      }

      // For demo purposes, limit exercise duration to a maximum of 30 seconds
      // This makes testing easier - remove this line for production
      return Math.min(value, 30);
    } catch (error) {
      console.error("Error parsing duration:", error);
      return 30; // Default to 30 seconds
    }
  };

  // Handle completion of all recommended exercises
  const handleRecommendationsComplete = () => {
    // Navigate to a completion screen or show a success message
    router.push({
      pathname: "/(tabs)/(triagem)/diagnostic-ideal",
      params: {
        message: "Parabéns! Você completou todos os exercícios recomendados.",
      },
    });
  };

  // if (loading) {
  //   return (
  //     <SafeAreaView className="flex-1 bg-white justify-center items-center">
  //       <ActivityIndicator size="large" color={colors.primary} />
  //       <Text className="mt-4 text-textPrimary">Carregando exercícios...</Text>
  //     </SafeAreaView>
  //   );
  // }

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
        <ScrollView className="flex-1 p-4">
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
