import { Video } from "expo-av";
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  Repeat,
} from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Button } from "./Button";

const { width, height } = Dimensions.get("window");

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

  const getExerciseDescription = (steps: StepType[]) => {
    if (!steps || steps.length === 0) return "";

    const descriptions = steps
      .flatMap((step) => {
        if (typeof step === "string") {
          return [step];
        }

        if (
          typeof step === "object" &&
          step !== null &&
          "description" in step
        ) {
          try {
            let jsonString = step.description?.replace(/'/g, '"');
            const parsed = JSON.parse(jsonString!);
            if (Array.isArray(parsed)) {
              return parsed
                .map((subStep: any) => subStep.description || "")
                .filter(Boolean);
            }
          } catch (e) {}
          return [step.description || ""];
        }

        return [String(step)];
      })
      .filter(Boolean);

    return descriptions.join(" ");
  };

  const exerciseDescription = getExerciseDescription(steps);
  const progressPercentage = ((duration - timeRemaining) / duration) * 100;

  return (
    <View className="flex-1 px-4">
      {exerciseDescription && !exerciseComplete && (
        <View className="bg-gradient-to-r from-primary/5 to-[#7FDEB7]/5 rounded-2xl p-4 border border-primary/10">
          <View className="flex-row items-center mb-2">
            <View className="w-2 h-2 rounded-full bg-primary mr-2" />
            <Text className="text-lg font-semibold text-textPrimary">
              Execução:
            </Text>
          </View>
          <Text
            className="text-textPrimary/80 leading-6 text-base"
            ellipsizeMode="tail"
          >
            {exerciseDescription}
          </Text>
        </View>
      )}

      <View className="items-center justify-center flex-1 min-h-[240px]">
        <View className="relative mb-6">
          <TouchableOpacity
            onPress={
              !timerRunning
                ? startExercise
                : isPaused
                ? resumeExercise
                : pauseExercise
            }
            activeOpacity={0.8}
            className="w-52 h-52 rounded-full items-center justify-center border-4 shadow-lg"
            style={{
              borderColor: `rgba(127, 222, 183, ${
                0.3 + (progressPercentage / 100) * 0.5
              })`,
              backgroundColor: `rgba(127, 222, 183, 0.08)`,
            }}
          >
            <View className="w-40 h-40 rounded-full bg-gradient-to-b from-[#7FDEB7] to-primary items-center justify-center shadow-xl">
              <View className="w-36 h-36 rounded-full bg-primary items-center justify-center">
                <Text className="text-2xl font-bold text-white mb-1">
                  {formatTime(timeRemaining)}
                </Text>

                <View className="flex-row items-center">
                  {!timerRunning ? (
                    exerciseComplete ? (
                      <Repeat size={16} color="rgba(255,255,255,0.8)" />
                    ) : (
                      <Play size={16} color="rgba(255,255,255,0.8)" />
                    )
                  ) : isPaused ? (
                    <Play size={16} color="rgba(255,255,255,0.8)" />
                  ) : (
                    <Pause size={16} color="rgba(255,255,255,0.8)" />
                  )}

                  <Text className="text-white/80 text-sm font-medium ml-2">
                    {!timerRunning
                      ? exerciseComplete
                        ? "Repetir"
                        : "Iniciar"
                      : isPaused
                      ? "Continuar"
                      : "Pausar"}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {exerciseComplete && (
          <View className="bg-[#7FDEB7]/20 rounded-full px-3 py-1 self-center mb-4">
            <Text className="text-[#7FDEB7] font-medium text-sm">
              ✓ Concluído
            </Text>
          </View>
        )}

        {exerciseComplete && (onNext || onPrevious) && (
          <View className="flex-row gap-4 px-8">
            {onPrevious && (
              <Button
                title="Anterior"
                onPress={onPrevious}
                variant="secondary"
                loading={isLoadingPrevious}
                Icon={ArrowLeft}
                className="flex-1 py-3"
              />
            )}

            {onNext && (
              <Button
                title="Próximo"
                onPress={onNext}
                iconPosition="right"
                loading={isLoadingNext}
                Icon={ArrowRight}
                className="flex-1 py-3"
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
}
