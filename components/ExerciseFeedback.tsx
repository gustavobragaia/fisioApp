import { EmojiHappy, Repeat } from "iconsax-react-native";
import React from "react";
import { Dimensions, SafeAreaView, Text, View } from "react-native";
import Rafiki from "../assets/images/workout/Rafiki";
import { Button } from "./Button";

interface ExerciseFeedbackProps {
  onRepeat: () => void;
  onComplete: () => void;
  onNext?: () => void;
}

const ExerciseFeedback = ({
  onRepeat,
  onComplete,
  onNext,
}: ExerciseFeedbackProps) => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-between px-6 pt-10 pb-8">
        <View className="flex-1 justify-center items-center">
          <View className="items-center mb-4">
            <Rafiki width={Dimensions.get("window").width - 48} />
          </View>

          <View className="w-full items-start">
            <Text className="text-3xl font-bold text-center mb-3 text-textPrimary">
              Você melhorou?
            </Text>
            <Text className="text-lg text-textPrimary">
              Você está se tornando sua melhor versão!
            </Text>
          </View>
        </View>

        <View className="w-full gap-2">
          <Button
            title="Sim, estou aliviado"
            onPress={onComplete}
            iconPosition="left"
            Icon={EmojiHappy}
          />
          <Button
            title="Quero repetir"
            onPress={onRepeat}
            variant="secondary"
            iconPosition="left"
            Icon={Repeat}
          />

          {onNext && (
            <Button title="Mais um alongamento/meditação" onPress={onNext} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExerciseFeedback;
