import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface WellnessCard {
  id: string;
  title: string;
  description: string;
  backgroundColor: string;
  iconEmoji: string;
  textColor: string;
}

const wellnessCardsData: WellnessCard[] = [
  {
    id: "1",
    title: "Coleção calmante para",
    description: "a ansiedade diária",
    backgroundColor: "bg-primary",
    iconEmoji: "😌",
    textColor: "text-white",
  },
  {
    id: "2",
    title: "Como começar a",
    description: "meditação",
    backgroundColor: "bg-greenLight",
    iconEmoji: "🧘‍♀️",
    textColor: "text-textPrimary",
  },
  {
    id: "3",
    title: "Coleção prosperar",
    description: "como um líder",
    backgroundColor: "bg-slate-700",
    iconEmoji: "⭐",
    textColor: "text-white",
  },
  {
    id: "4",
    title: "Atenção plena no",
    description: "trabalho",
    backgroundColor: "bg-gray-100",
    iconEmoji: "💼",
    textColor: "text-gray-800",
  },
];

interface WellnessCardsSectionProps {
  onCardPress?: (cardId: string) => void;
}

export function WellnessCardsSection({
  onCardPress,
}: WellnessCardsSectionProps) {
  const handleCardPress = (cardId: string) => {
    if (onCardPress) {
      onCardPress(cardId);
    }
  };

  return (
    <View className="px-6 py-4">
      <Text className="font-semibold text-textPrimary text-xl mb-4">
        Bem-estar Mental
      </Text>

      <View className="gap-3">
        {wellnessCardsData.map((card) => (
          <TouchableOpacity
            key={card.id}
            onPress={() => handleCardPress(card.id)}
            className={`${card.backgroundColor} rounded-2xl p-4 min-h-[80px] flex-row items-center justify-between shadow-sm`}
            activeOpacity={0.7}
          >
            <View className="flex-1">
              <Text
                className={`${card.textColor} font-semibold text-lg leading-tight`}
              >
                {card.title}
              </Text>
              <Text
                className={`${card.textColor} font-semibold text-base leading-tight`}
              >
                {card.description}
              </Text>
            </View>

            <View className="ml-3">
              <Text className="text-3xl">{card.iconEmoji}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
