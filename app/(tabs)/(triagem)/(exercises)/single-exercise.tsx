import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, Text, View } from "react-native";
import BackHeader from "../../../../components/BackHeader";
import Exercise from "../../../../components/Exercise";
import ExerciseFeedback from "../../../../components/ExerciseFeedback";
import { supabase } from "../../../../lib/supabase";

export default function SingleExerciseScreen() {
  const router = useRouter();
  const [showFeedback, setShowFeedback] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data && data.user) {
        setUserId(data.user.id);
      }
    };

    getUser();
  }, []);

  const params = useLocalSearchParams<{
    exerciseId: string;
    exerciseName: string;
    exerciseVideoUrl?: string;
    exerciseSteps?: string;
    exerciseDuration?: string;
    exerciseIndex?: string;
    totalExercises?: string;
    groupId?: string;
    triagemId?: string;
    allExercises?: string;
  }>();

  const allExercises = React.useMemo(() => {
    try {
      if (params.allExercises) {
        return JSON.parse(params.allExercises);
      }
      return [];
    } catch (error) {
      console.error("Error parsing all exercises:", error);
      return [];
    }
  }, [params.allExercises]);

  const exerciseSteps = React.useMemo(() => {
    try {
      if (params.exerciseSteps) {
        const parsed = JSON.parse(params.exerciseSteps);

        if (Array.isArray(parsed)) {
          return parsed;
        } else if (typeof parsed === "object") {
          return Object.values(parsed);
        }
      }
      return [];
    } catch (error) {
      console.error("Error parsing exercise steps:", error);
      return [];
    }
  }, [params.exerciseSteps]);

  const duration = React.useMemo(() => {
    try {
      if (params.exerciseDuration) {
        return parseInt(params.exerciseDuration, 10) || 30;
      }
      return 30;
    } catch (error) {
      console.error("Error parsing exercise duration:", error);
      return 30;
    }
  }, [params.exerciseDuration]);

  const currentIndex = params.exerciseIndex
    ? parseInt(params.exerciseIndex, 10)
    : 0;
  const totalExercises = params.totalExercises
    ? parseInt(params.totalExercises, 10)
    : 1;

  const handleExerciseComplete = async () => {
    if (currentIndex === totalExercises - 1) {
      const { error } = await supabase
        .from("triagens")
        .update({
          status: "completed",
          completion_date: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("id", params.triagemId);

      if (error) {
        console.error("Error updating triagem status:", error);
      }

      setShowFeedback(true);
    }
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

  const navigateToExercise = (index: number) => {
    const exercise = allExercises[index];
    if (!exercise) return;

    const durationInSeconds = parseDurationToSeconds(
      exercise.duration || "30 segundos"
    );

    router.replace({
      pathname: "/(tabs)/(triagem)/(exercises)/single-exercise",
      params: {
        exerciseId: exercise.id,
        exerciseName: exercise.name || exercise.nome,
        exerciseVideoUrl: exercise.video_url || exercise.videoUrl,
        exerciseSteps: JSON.stringify(exercise.steps || []),
        exerciseDuration: durationInSeconds.toString(),
        exerciseIndex: index.toString(),
        totalExercises: totalExercises.toString(),
        groupId: params.groupId,
        triagemId: params.triagemId,
        allExercises: params.allExercises,
      },
    });
  };

  const markExerciseCompleteMutation = useMutation({
    mutationFn: async () => {
      if (!userId || !params.exerciseId || !params.triagemId) {
        console.log("Missing required data");
        return;
      }

      const { error } = await supabase
        .from("user_exercises")
        .update({
          completed: true,
          completion_date: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("exercise_id", params.exerciseId)
        .eq("triagem_id", params.triagemId);

      if (error) {
        throw error;
      }

      await queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
    },
    onError: (error) => {
      console.error("Error marking exercise as completed:", error);
    },
  });

  const nextExerciseMutation = useMutation({
    mutationFn: async () => {
      await markExerciseCompleteMutation.mutateAsync();

      await navigateToExercise(currentIndex + 1);
    },
    onSuccess: () => {
      setShowFeedback(false);
    },
    onError: (error) => {
      console.error("Error in nextExerciseMutation:", error);
    },
  });

  const previousExerciseMutation = useMutation({
    mutationFn: async () => {
      await markExerciseCompleteMutation.mutateAsync();

      await navigateToExercise(currentIndex - 1);
    },
    onSuccess: () => {
      setShowFeedback(false);
    },
    onError: (error) => {
      console.error("Error in previousExerciseMutation:", error);
    },
  });

  const completeExerciseMutation = useMutation({
    mutationFn: async () => {
      if (!params.triagemId || !params.exerciseId) {
        console.log("Missing triagem or exercise ID");
        return;
      }

      const { error } = await supabase
        .from("user_exercises")
        .update({
          completed: true,
          completion_date: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("exercise_id", params.exerciseId)
        .eq("triagem_id", params.triagemId);

      if (error) {
        throw error;
      }

      await queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
    },
    onSuccess: () => {
      router.back();
    },
    onError: (error) => {
      console.error("Error in completeExerciseMutation:", error);
      router.back();
    },
  });

  const handlePreviousExercise = () => {
    if (currentIndex > 0 && !previousExerciseMutation.isPending) {
      previousExerciseMutation.mutate();
    }
  };

  const handleNextExercise = () => {
    if (currentIndex < totalExercises - 1 && !nextExerciseMutation.isPending) {
      nextExerciseMutation.mutate();
    }
  };

  const handleCompleteExercise = () => {
    if (!completeExerciseMutation.isPending) {
      completeExerciseMutation.mutate();
    }
  };

  const handleRepeatExercise = () => {
    setShowFeedback(false);
  };

  const renderDotsIndicator = () => {
    const screenWidth = Dimensions.get("window").width;
    const containerPadding = 48;
    const dotMargin = 8;
    const totalMargins = (totalExercises - 1) * dotMargin;
    const availableWidth = screenWidth - containerPadding - totalMargins;
    const dotWidth = Math.min(availableWidth / totalExercises, 40);

    return (
      <View className="flex-row justify-center items-center mt-2 mb-1 px-4">
        {Array.from({ length: totalExercises }, (_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full ${
              index === currentIndex ? "bg-primary" : "bg-gray-200"
            }`}
            style={{
              width: dotWidth,
              marginHorizontal: dotMargin / 2,
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {showFeedback ? (
        <ExerciseFeedback
          onRepeat={handleRepeatExercise}
          onComplete={handleCompleteExercise}
          onNext={
            currentIndex < totalExercises - 1 ? handleNextExercise : undefined
          }
        />
      ) : (
        <View className="flex-1 pt-4">
          <View className="px-6 pt-12 pb-2">
            <BackHeader
              title={params.exerciseName || "Exercício"}
              totalExercises={totalExercises}
              currentIndex={currentIndex}
            />

            {totalExercises > 1 && (
              <View className="mt-2 mb-1">
                <Text className="text-sm text-textPrimary text-left mb-2">
                  Exercício {currentIndex + 1} de {totalExercises}
                </Text>
                {renderDotsIndicator()}
              </View>
            )}
          </View>

          <ScrollView>
            <View className="flex-1 px-6">
              <Exercise
                id={params.exerciseId}
                name={params.exerciseName}
                videoUrl={params.exerciseVideoUrl}
                steps={exerciseSteps}
                duration={duration}
                onComplete={handleExerciseComplete}
                onPrevious={
                  currentIndex > 0 ? handlePreviousExercise : undefined
                }
                onNext={
                  currentIndex < totalExercises - 1
                    ? handleNextExercise
                    : undefined
                }
                isLoadingComplete={markExerciseCompleteMutation.isPending}
                isLoadingNext={nextExerciseMutation.isPending}
                isLoadingPrevious={previousExerciseMutation.isPending}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}
