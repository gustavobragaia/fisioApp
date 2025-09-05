import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface WellnessCard {
  id: string;
  title: string;
  description: string;
  backgroundColor: string;
  shadowColor: string;
  iconEmoji: string;
  textColor: string;
}

const wellnessCardsData: WellnessCard[] = [
  {
    id: "reduzirAnsiedade",
    title: "Coleção calmante para",
    description: "reduzir ansiedade ou estresse",
    backgroundColor: "bg-blue-500",
    shadowColor: "shadow-blue-500/30",
    iconEmoji: "😌",
    textColor: "text-white",
  },
  {
    id: "dormirMelhor",
    title: "Técnicas para",
    description: "dormir melhor",
    backgroundColor: "bg-indigo-600",
    shadowColor: "shadow-indigo-600/30",
    iconEmoji: "🌙",
    textColor: "text-white",
  },
  {
    id: "controlarPensamentos",
    title: "Aprenda a",
    description: "controlar meus pensamentos",
    backgroundColor: "bg-purple-500",
    shadowColor: "shadow-purple-500/30",
    iconEmoji: "🧠",
    textColor: "text-white",
  },
  {
    id: "melhorarBemEstar",
    title: "Guia para",
    description: "melhorar meu bem-estar emocional",
    backgroundColor: "bg-emerald-500",
    shadowColor: "shadow-emerald-500/30",
    iconEmoji: "💚",
    textColor: "text-white",
  },
  {
    id: "criarRotina",
    title: "Como",
    description: "criar uma rotina mental saudável",
    backgroundColor: "bg-orange-400",
    shadowColor: "shadow-orange-400/30",
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
      <Text className="font-bold text-textPrimary text-2xl mb-6">
        Bem-estar Mental
      </Text>

      <View className="gap-4">
        {wellnessCardsData.map((card) => (
          <TouchableOpacity
            key={card.id}
            onPress={() => handleCardPress(card.id)}
            className={`
              ${card.backgroundColor}
              rounded-3xl
              p-6
              min-h-[100px]
              flex-row
              items-center
              justify-between
              shadow-lg
              ${card.shadowColor}
              elevation-8
              transform
              transition-all
              duration-200
            `}
            style={{
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
            activeOpacity={0.8}
          >
            <View className="flex-1 pr-4">
              <Text
                className={`${card.textColor} font-bold text-lg leading-tight mb-1`}
              >
                {card.title}
              </Text>
              <Text
                className={`${card.textColor} font-medium text-base leading-tight opacity-90`}
              >
                {card.description}
              </Text>
            </View>

            <View className="bg-white/20 rounded-2xl p-3 backdrop-blur-sm">
              <Text className="text-4xl">{card.iconEmoji}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
