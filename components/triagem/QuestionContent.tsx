import { Question } from "@/types/triagem";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { OptionCard } from "../OptionCard";

interface QuestionContentProps {
  question: Question;
}

export function QuestionContent({ question }: QuestionContentProps) {
  return (
    <View className="flex-1">
      <Text className="text-2xl font-bold mb-8 text-textPrimary">
        {question.question}
      </Text>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between">
          {question.options.map((option) => (
            <View key={option.value} className="w-[49%] mb-2">
              <OptionCard
                title={option.label}
                value={option.value}
                selectedValue={question.state}
                icon={
                  <Image
                    source={option.imageSource}
                    width={24}
                    height={24}
                    alt={option.label}
                  />
                }
                onPress={() => question.setState(option.value)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
