import { FormMentalHealth } from "@/components/triagem/FormMentalHealth";
import { FormTriagemRefType } from "@/types/triagem";
import { useFocusEffect } from "expo-router";
import React, { useRef } from "react";
import { SafeAreaView, View } from "react-native";

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
        <FormMentalHealth ref={formRef} />
      </View>
    </SafeAreaView>
  );
}
