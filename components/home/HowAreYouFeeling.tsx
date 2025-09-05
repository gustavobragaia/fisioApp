import { supabase } from "@/lib/supabase";
import colors from "@/styles/colors";
import {
  EmojiHappy,
  EmojiNormal,
  EmojiSad,
  Smileys,
} from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { EmptyState } from "../EmptyState";

const validEmotions = ["Triste", "Regular", "Ótimo", "Excelente"];

export const HowAreYouFeeling = ({ userId }: { userId: string }) => {
  const [hasAnsweredToday, setHasAnsweredToday] = useState(false);
  const toast = useToast();

  const checkAnsweredToday = async () => {
    const today = new Date().toISOString().slice(0, 10);
    const { data } = await supabase
      .from("emotion_user")
      .select("id")
      .eq("user_id", userId)
      .eq("date", today)
      .limit(1)
      .single();

    if (data) {
      setHasAnsweredToday(true);
    } else {
      setHasAnsweredToday(false);
    }
  };

  useEffect(() => {
    if (userId) {
      checkAnsweredToday();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleEmotionSelect = async (emotion: string) => {
    if (hasAnsweredToday) {
      toast.show("Você já respondeu hoje. Obrigado!", {
        type: "info",
        duration: 3000,
        placement: "bottom",
      });
      return;
    }

    if (!validEmotions.includes(emotion)) {
      toast.show("Emoção inválida.", {
        type: "danger",
        duration: 3000,
        placement: "bottom",
      });
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    const { error } = await supabase
      .from("emotion_user")
      .insert([
        {
          user_id: userId,
          emotion,
          date: today,
        },
      ])
      .select();

    if (error) {
      toast.show("Erro ao registrar sua emoção. Tente novamente mais tarde.", {
        type: "danger",
        duration: 3000,
        placement: "bottom",
      });
      console.error(error);
    } else {
      setHasAnsweredToday(true);
      let message = "";
      switch (emotion) {
        case "Triste":
          message =
            "Obrigado por compartilhar como está se sentindo. Estamos aqui para ajudar!";
          break;
        case "Regular":
          message = "Obrigado por nos contar! Esperamos que seu dia melhore.";
          break;
        case "Ótimo":
          message = "Que bom que está se sentindo ótimo! Continue assim!";
          break;
        case "Excelente":
          message = "Excelente! Que seu dia continue maravilhoso!";
          break;
        default:
          message = "Obrigado por compartilhar!";
      }
      toast.show(message, {
        type: "success",
        duration: 3000,
        placement: "bottom",
      });
    }
  };

  if (hasAnsweredToday) {
    return null;
  }

  return (
    <View className="flex-1 h-full">
      <Text className="font-semibold text-textPrimary text-xl mb-4 mt-6">
        Meu Diário Emocional
      </Text>
      <EmptyState
        variant="emotions"
        title="Como você está se sentindo hoje?"
        bottomComponent={
          <View className="flex-row items-center justify-around gap-12">
            <TouchableOpacity
              className="flex flex-col items-center"
              activeOpacity={0.7}
              onPress={() => handleEmotionSelect("Triste")}
            >
              <EmojiSad key="sad" size={32} color={colors.primary} />
              <Text className="text-sm font-bold text-primary">Triste</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-col items-center"
              activeOpacity={0.7}
              onPress={() => handleEmotionSelect("Regular")}
            >
              <Smileys key="smileys" size={32} color={colors.primary} />
              <Text className="text-sm font-bold text-primary">Regular</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-col items-center"
              activeOpacity={0.7}
              onPress={() => handleEmotionSelect("Ótimo")}
            >
              <EmojiNormal key="normal" size={32} color={colors.primary} />
              <Text className="text-sm font-bold text-primary">Ótimo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-col items-center"
              activeOpacity={0.7}
              onPress={() => handleEmotionSelect("Excelente")}
            >
              <EmojiHappy key="happy" size={32} color={colors.primary} />
              <Text className="text-sm font-bold text-primary">Excelente</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};
