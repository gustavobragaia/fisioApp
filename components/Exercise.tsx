import { Video } from "expo-av";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Pause,
  Play,
  Repeat,
} from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    setTimeRemaining(duration);
    setTimerRunning(false);
    setExerciseComplete(false);
    setIsPaused(false);
    setShowInstructions(false);

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
      {exerciseComplete && (
        <View className="bg-[#7FDEB7]/10 rounded-full px-3 py-1 self-center mb-3">
          <Text className="text-[#7FDEB7] font-medium text-sm">
            ✓ Concluído
          </Text>
        </View>
      )}

      {exerciseDescription && (
        <View className="mb-4">
          <TouchableOpacity
            onPress={() => setShowInstructions(!showInstructions)}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex-row items-center justify-between"
          >
            <Text className="text-lg font-semibold text-textPrimary flex-1">
              Como fazer
            </Text>
            {showInstructions ? (
              <ArrowUp size={20} color="#666" />
            ) : (
              <ArrowDown size={20} color="#666" />
            )}
          </TouchableOpacity>

          {showInstructions && (
            <View className="bg-white z-50 rounded-xl p-4 mt-2 shadow-sm border border-gray-100">
              <ScrollView
                style={{ maxHeight: 120 }}
                showsVerticalScrollIndicator={false}
              >
                <Text className="text-textPrimary/80 leading-6 text-base">
                  {exerciseDescription}
                </Text>
              </ScrollView>
            </View>
          )}
        </View>
      )}

      <View
        className={`items-center justify-center flex-1 ${
          showInstructions && "mt-[-140px]"
        }`}
      >
        <View className="relative">
          <View className="w-52 h-52 rounded-full bg-gray-100 items-center justify-center">
            <View
              className="w-44 h-44 rounded-full items-center justify-center"
              style={{
                backgroundColor: `rgba(127, 222, 183, ${
                  0.1 + (progressPercentage / 100) * 0.2
                })`,
              }}
            >
              <View className="w-36 h-36 rounded-full bg-[#7FDEB7] items-center justify-center shadow-lg">
                <View className="w-28 h-28 rounded-full bg-primary items-center justify-center">
                  <Text className="text-xl font-bold text-white mb-1">
                    {formatTime(timeRemaining)}
                  </Text>
                  <Text className="text-white/70 text-xs text-center">
                    {timerRunning ? (isPaused ? "Pausado" : "Ativo") : "Pronto"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="pb-6">
        {!timerRunning ? (
          <View>
            <Button
              title={exerciseComplete ? "Repetir" : "Iniciar"}
              onPress={startExercise}
              iconPosition="left"
              Icon={exerciseComplete ? Repeat : Play}
              className="mb-3"
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
            title={isPaused ? "Continuar" : "Pausar"}
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
