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
    id: "reduzirAnsiedade",
    title: "Coleção calmante para",
    description: "reduzir ansiedade ou estresse",
    backgroundColor: "bg-blue-500",
    iconEmoji: "😌",
    textColor: "text-white",
  },
  {
    id: "dormirMelhor",
    title: "Técnicas para",
    description: "dormir melhor",
    backgroundColor: "bg-indigo-600",
    iconEmoji: "🌙",
    textColor: "text-white",
  },
  {
    id: "controlarPensamentos",
    title: "Aprenda a",
    description: "controlar meus pensamentos",
    backgroundColor: "bg-purple-500",
    iconEmoji: "🧠",
    textColor: "text-white",
  },
  {
    id: "melhorarBemEstar",
    title: "Guia para",
    description: "melhorar meu bem-estar emocional",
    backgroundColor: "bg-emerald-500",
    iconEmoji: "💚",
    textColor: "text-white",
  },
  {
    id: "criarRotina",
    title: "Como",
    description: "criar uma rotina mental saudável",
    backgroundColor: "bg-orange-400",
    iconEmoji: "✨",
    textColor: "text-white",
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
