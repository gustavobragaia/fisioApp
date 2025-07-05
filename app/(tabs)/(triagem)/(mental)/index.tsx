import { FormMentalHealth } from "@/components/triagem/FormMentalHealth";
import colors from "@/styles/colors";
import { FormTriagemRefType } from "@/types/triagem";
import { router, useFocusEffect } from "expo-router";
import { ArrowLeft2 } from "iconsax-react-native";
import React, { useRef } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View
} from "react-native";

export default function MentalHealthTriagePage() {
  const formRef = useRef<FormTriagemRefType>(null);

  useFocusEffect(
    React.useCallback(() => {
      if (formRef.current) {
        formRef.current.resetForm();
      }
      return () => {};
    }, [])
  );
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 w-full h-full p-6 pt-20">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/triagem")}
          className="bg-white rounded-full w-14 h-14 items-center justify-center"
        >
          <ArrowLeft2 size={24} color={colors.primary} />
        </TouchableOpacity>

        <FormMentalHealth ref={formRef} />
      </View>
    </SafeAreaView>
  );
}
