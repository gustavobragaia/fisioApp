/* eslint-disable @typescript-eslint/no-unused-vars */

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
  const [loading, setLoading] = useState(false);

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
  }>();

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
        return 30;
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
  const exerciseIndex = parseInt(params.exerciseIndex || "0", 10);

  const handleExerciseComplete = () => {
    if (currentIndex === totalExercises - 1) {
      setShowFeedback(true);
    }
    console.log("Exercise completed! Ready for user to click PRÓXIMO");
  };

  const handlePreviousExercise = () => {
    if (currentIndex > 0) {
      setShowFeedback(false);

      router.replace({
        pathname: "/(tabs)/(triagem)/(exercises)/exercise-group",
        params: {
          goToExerciseIndex: (currentIndex - 1).toString(),
          categoryName: params.groupId || "",
          categoryType: "Exercícios",
          triagemId: params.triagemId,
          timestamp: Date.now().toString(),
        },
      });
    }
  };

  const handleCompleteExercise = async () => {
    try {
      if (params.triagemId && params.exerciseId) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
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
            console.error("Error marking exercise as completed:", error);
          }

          navigateBackToGroup()
        }
      }

      // Navigate based on whether there are more exercises
      if (exerciseIndex < totalExercises - 1) {
        // Go to next exercise
        router.replace({
          pathname: "/(tabs)/(triagem)/(exercises)/single-exercise",
          params: {
            ...params,
            exerciseIndex: (exerciseIndex + 1).toString(),
          },
        });
      } else {
      }
    } catch (error) {
      console.error("Error in handleCompleteExercise:", error);
      router.back();
    }
  };

  const handleNextExercise = async () => {
    if (currentIndex < totalExercises - 1) {
      if (userId && params.exerciseId && params.triagemId) {
        try {
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
            console.error("Error updating exercise completion status:", error);
          } else {
            console.log("Exercise marked as completed successfully!");
          }
        } catch (error) {
          console.error("Error in handleNextExercise:", error);
        }
      }

      setShowFeedback(false);

      router.replace({
        pathname: "/(tabs)/(triagem)/(exercises)/exercise-group",
        params: {
          goToExerciseIndex: (currentIndex + 1).toString(),
          categoryName: params.groupId || "",
          categoryType: "Exercícios",
          triagemId: params.triagemId,
          timestamp: Date.now().toString(),
        },
      });
    }
  };

  const navigateBackToGroup = () => {
    router.replace({
      pathname: "/(tabs)/(triagem)/(exercises)/exercise-group",
      params: {
        categoryName: params.groupId || "",
        categoryType: "Exercícios",
        triagemId: params.triagemId,
        timestamp: Date.now().toString(),
      },
    });
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
              index === currentIndex ? "bg-deepBlue" : "bg-gray-200"
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
            exerciseIndex < totalExercises - 1 ? handleNextExercise : undefined
          }
        />
      ) : (
        <View className="flex-1 bg-background">
          <View className="px-6 pt-12 pb-2">
            <BackHeader
              title={params.exerciseName || "Exercício"}
              totalExercises={totalExercises}
              currentIndex={currentIndex}
            />

            {totalExercises > 1 && (
              <View className="mt-2 mb-1">
                <Text className="text-sm text-textPrimary text-center mb-2">
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
              />
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}
