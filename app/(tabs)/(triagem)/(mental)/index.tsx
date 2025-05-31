import React, { useRef } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../../styles/colors";
import FormMentalHealth, { FormMentalHealthRefType } from "../../../../components/FormMentalHealth";

export default function MentalHealthTriagePage() {
  // Create a ref for the form component
  const formRef = useRef<FormMentalHealthRefType>(null);
  
  // Reset the form when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      // Reset form when screen is focused
      if (formRef.current) {
        formRef.current.resetForm();
      }
      return () => {};
    }, [])
  );
  return (
    <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 w-full h-full p-5">
          {/* Header with back button */}
          <TouchableOpacity 
            onPress={() => router.back()}
            className="flex-row items-center mb-6"
          >
            <Ionicons name="arrow-back" size={24} color={colors.light.deepBlue} />
            <Text className="ml-2 text-lg font-medium text-slate-700">Voltar</Text>
          </TouchableOpacity>

          <Text className="text-3xl font-bold text-slate-700 mb-6">Avaliação de saúde mental</Text>
          <Text className="text-lg text-slate-600 mb-8">
            Vamos entender melhor como você está se sentindo para recomendar os melhores exercícios
          </Text>
          
          {/* Mental health assessment form component */}
          <FormMentalHealth ref={formRef} />
        </View>
    </SafeAreaView>
  );
}
