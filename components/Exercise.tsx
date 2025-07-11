import { ResizeMode, Video } from "expo-av";
import { Pause, Play, Repeat } from "iconsax-react-native";
import React, { useEffect, useRef, useState } from "react";
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
  name: string;
  videoUrl?: string;
  steps?: StepType[];
  onComplete?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  duration?: number;
};

export default function Exercise({
  id,
  name,
  videoUrl = "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  steps = [],
  onComplete,
  onPrevious,
  onNext,
  duration = 30,
}: ExerciseProps) {
  const videoRef = useRef<Video>(null);

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

  return (
    <View className="flex-1">
      <View className="items-center mb-6 rounded-xl overflow-hidden bg-primary/5">
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          style={{ width: width - 48, height: 220 }}
        />
      </View>

      {parsedSteps.length > 0 && (
        <View className="mb-8">
          {parsedSteps.map((step, index) => (
            <View key={index} className="mb-4">
              <Text className="text-textPrimary font-bold mb-1">
                {step.title}
              </Text>
              <Text className="text-textPrimary">{step.description}</Text>
            </View>
          ))}
        </View>
      )}

      <View className="items-center mb-8">
        <View className="relative items-center justify-center">
          <View className="w-96 h-96 rounded-full bg-[#7FDEB7]/20 items-center justify-center">
            <View className="w-72 h-72 rounded-full bg-[#7FDEB7] items-center justify-center">
              <View className="w-48 h-48 rounded-full bg-primary items-center justify-center">
                <Text className="text-4xl font-bold text-white">
                  {formatTime(timeRemaining)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="mb-28">
        {!timerRunning ? (
          <Button
            title={exerciseComplete ? "Repetir exercício" : "Iniciar exercício"}
            onPress={startExercise}
            iconPosition="left"
            Icon={exerciseComplete ? Repeat : Play}
          />
        ) : (
          <Button
            title={isPaused ? "Retomar" : "Pausar"}
            onPress={isPaused ? resumeExercise : pauseExercise}
            variant="secondary"
            iconPosition="left"
            Icon={isPaused ? Play : Pause}
          />
        )}
      </View>

      <View style={{ position: "absolute", top: -1000, left: -1000 }}>
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          style={{ width: 1, height: 1 }}
        />
      </View>
    </View>
  );
}
