import { ResizeMode, Video } from "expo-av";
import { Back, Pause, Play, Repeat } from "iconsax-react-native";
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
  duration?: number; // Duration in seconds
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

  return (
    <View className="flex-1 bg-white">
      <View className="items-center mb-6 rounded-xl overflow-hidden bg-primary/5">
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          style={{ width: width - 32, height: 220 }}
        />
      </View>

      {steps.length > 0 && (
        <View className="mb-8">
          {steps.map((step, index) => {
            const isStepObject = typeof step === "object" && step !== null;
            const title = isStepObject && "title" in step ? step.title : "";
            const description =
              isStepObject && "description" in step ? step.description : "";

            const stepContent = isStepObject ? (
              <View>
                {title && (
                  <Text className="text-textPrimary font-bold">{title}</Text>
                )}
                {description && (
                  <Text className="text-textPrimary">{description}</Text>
                )}
              </View>
            ) : (
              <Text className="text-textPrimary flex-1">{String(step)}</Text>
            );

            return (
              <View key={index} className="mb-4">
                <Text className="text-textPrimary font-bold mb-1">
                  Passo {index + 1}.
                </Text>
                <View className="flex-1">{stepContent}</View>
              </View>
            );
          })}
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
            Icon={isPaused ? Back : Pause}
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

      {/* Exercise Steps - Hidden in this layout but keeping for compatibility */}
      {steps.length > 0 && false && (
        <View className="bg-white p-4 rounded-lg shadow-sm mx-6 mt-6">
          <Text className="text-lg font-bold text-deepBlue mb-2">
            Como fazer:
          </Text>
          {steps.map((step, index) => {
            // Check if step is an object with title and description
            const isStepObject = typeof step === "object" && step !== null;
            const title = isStepObject && "title" in step ? step.title : "";
            const description =
              isStepObject && "description" in step ? step.description : "";

            // If step is a string or can't be parsed as an object, just show it as is
            const stepContent = isStepObject ? (
              <View>
                {title && (
                  <Text className="text-textPrimary font-bold">{title}</Text>
                )}
                {description && (
                  <Text className="text-textPrimary">{description}</Text>
                )}
              </View>
            ) : (
              <Text className="text-textPrimary flex-1">{String(step)}</Text>
            );

            return (
              <View key={index} className="flex-row mb-4">
                <Text className="text-deepBlue font-bold mr-2">
                  {index + 1}.
                </Text>
                <View className="flex-1">{stepContent}</View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}
