import { Video } from "expo-av";
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  Repeat,
} from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { Button } from "./Button";

const { width } = Dimensions.get("window");

export type StepType =
  | {
      title?: string;
      description?: string;
    }
  | string;

export type ExerciseProps = {
  id: string;
  videoRef: React.RefObject<Video | null>;
  steps?: StepType[];
  onComplete?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  duration?: number;
  isLoadingNext?: boolean;
  isLoadingPrevious?: boolean;
  isLoadingComplete?: boolean;
};

export default function Exercise({
  id,
  videoRef,
  steps = [],
  onComplete,
  onPrevious,
  onNext,
  duration = 30,
  isLoadingNext,
  isLoadingPrevious,
  isLoadingComplete,
}: ExerciseProps) {
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [exerciseComplete, setExerciseComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setTimeRemaining(duration);
    setTimerRunning(false);
    setExerciseComplete(false);
    setIsPaused(false);

    if (videoRef.current) {
      videoRef.current.stopAsync().catch((error) => {
        console.error("Error stopping video:", error);
      });
    }
  }, [id, duration]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (timerRunning && timeRemaining > 0 && !isPaused) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timerRunning && timeRemaining === 0) {
      setTimerRunning(false);
      setExerciseComplete(true);
      if (onComplete) onComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timeRemaining, onComplete, isPaused]);

  const startExercise = async () => {
    try {
      if (exerciseComplete) {
        setTimeRemaining(duration);
        setExerciseComplete(false);
      }

      setTimerRunning(true);
      setIsPaused(false);

      if (videoRef.current) {
        await videoRef.current.playAsync();
      }
    } catch (error) {
      console.error("Error starting exercise:", error);
    }
  };

  const pauseExercise = async () => {
    try {
      setIsPaused(true);

      if (videoRef.current) {
        await videoRef.current.pauseAsync();
      }
    } catch (error) {
      console.error("Error pausing exercise:", error);
    }
  };

  const resumeExercise = async () => {
    try {
      setIsPaused(false);

      if (videoRef.current) {
        await videoRef.current.playAsync();
      }
    } catch (error) {
      console.error("Error resuming exercise:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const parseStepsForDisplay = (steps: StepType[]) => {
    if (!steps || steps.length === 0) return [];

    return steps.flatMap((step, stepIndex) => {
      if (typeof step === "string") {
        return [
          {
            title: `Passo ${stepIndex + 1}`,
            description: step,
          },
        ];
      }

      if (typeof step === "object" && step !== null && "description" in step) {
        try {
          let jsonString = step.description?.replace(/'/g, '"');

          const parsed = JSON.parse(jsonString!);
          if (Array.isArray(parsed)) {
            return parsed.map((subStep: any, subIndex: number) => ({
              title: subStep.title || `Passo ${subIndex + 1}`,
              description: subStep.description || "",
            }));
          }
        } catch (e) {
          console.log("Failed to parse step description as JSON:", e);
        }

        return [
          {
            title: step.title || `Passo ${stepIndex + 1}`,
            description: step.description || "",
          },
        ];
      }

      return [
        {
          title: `Passo ${stepIndex + 1}`,
          description: String(step),
        },
      ];
    });
  };

  const parsedSteps = parseStepsForDisplay(steps);
  const progressPercentage = ((duration - timeRemaining) / duration) * 100;

  return (
    <View className="flex-1">
      <View className="pb-2">
        {exerciseComplete && (
          <View className="bg-[#7FDEB7]/10 rounded-full px-4 py-2 mt-2 self-center">
            <Text className="text-[#7FDEB7] font-semibold text-center">
              ✓ Exercício concluído
            </Text>
          </View>
        )}
      </View>

      {parsedSteps.length > 0 && (
        <View className=" mb-8">
          <Text className="text-lg font-bold text-textPrimary mb-4">
            Como fazer:
          </Text>
          {parsedSteps.map((step, index) => (
            <View
              key={index}
              className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
            >
              <View className="flex-row items-start">
                <View className="w-6 h-6 rounded-full bg-[#7FDEB7] items-center justify-center mr-3 mt-0.5">
                  <Text className="text-white text-xs font-bold">
                    {index + 1}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-textPrimary font-semibold mb-1">
                    {step.title}
                  </Text>
                  <Text className="text-textPrimary/70 leading-5">
                    {step.description}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      <View className="items-center mb-8 ">
        <View className="relative">
          <View className="w-80 h-80 rounded-full bg-gray-100 items-center justify-center">
            <View
              className="w-72 h-72 rounded-full items-center justify-center"
              style={{
                backgroundColor: `rgba(127, 222, 183, ${
                  0.1 + (progressPercentage / 100) * 0.2
                })`,
              }}
            >
              <View className="w-60 h-60 rounded-full bg-[#7FDEB7] items-center justify-center shadow-lg">
                <View className="w-44 h-44 rounded-full bg-primary items-center justify-center">
                  <Text className="text-3xl font-bold text-white mb-2">
                    {formatTime(timeRemaining)}
                  </Text>
                  <Text className="text-white/70 text-sm">
                    {timerRunning
                      ? isPaused
                        ? "Pausado"
                        : "Em andamento"
                      : "Pronto"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {timerRunning && (
            <View className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <View className="bg-white rounded-full px-3 py-1 shadow-md">
                <Text className="text-primary text-xs font-semibold">
                  {Math.round(progressPercentage)}%
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>

      <View className="mb-64">
        {!timerRunning ? (
          <View>
            <Button
              title={
                exerciseComplete ? "Repetir exercício" : "Iniciar exercício"
              }
              onPress={startExercise}
              iconPosition="left"
              Icon={exerciseComplete ? Repeat : Play}
              className="mb-4"
            />

            {(onNext || onPrevious) && exerciseComplete && (
              <View className="flex-row gap-3">
                {onPrevious && (
                  <Button
                    title="Anterior"
                    onPress={onPrevious}
                    variant="secondary"
                    loading={isLoadingPrevious}
                    Icon={ArrowLeft}
                    className="flex-1"
                  />
                )}
                {onNext && (
                  <Button
                    title="Próximo"
                    onPress={onNext}
                    iconPosition="right"
                    loading={isLoadingNext}
                    Icon={ArrowRight}
                    className="flex-1"
                  />
                )}
              </View>
            )}
          </View>
        ) : (
          <Button
            title={isPaused ? "Retomar exercício" : "Pausar exercício"}
            onPress={isPaused ? resumeExercise : pauseExercise}
            variant="secondary"
            iconPosition="left"
            Icon={isPaused ? Play : Pause}
          />
        )}
      </View>
    </View>
  );
}
