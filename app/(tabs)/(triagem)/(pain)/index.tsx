import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FormPainSymptoms from "../../../../components/FormPainSymptoms";
import colors from "../../../../styles/colors";

export default function PainTriagePage() {
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

        <Text className="text-3xl font-bold text-slate-700 mb-6">Avaliação de dor</Text>
        <Text className="text-lg text-slate-600 mb-8">
          Vamos entender melhor sua dor para recomendar os melhores exercícios
        </Text>
        
        {/* Pain symptoms form */}
        <FormPainSymptoms />
      </View>
    </SafeAreaView>
  );
}
