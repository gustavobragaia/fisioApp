import { router, useFocusEffect } from "expo-router";
import { ArrowLeft2 } from 'iconsax-react-native';
import React, { useRef } from 'react';
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import FormPainSymptoms, { FormPainSymptomsRefType } from "../../../../components/FormPainSymptoms";
import colors from "../../../../styles/colors";

export default function PainTriagePage() {
  const formRef = useRef<FormPainSymptomsRefType>(null);
  
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
      <View className="flex-1 w-full h-full p-6">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="bg-white rounded-full w-10 h-10 items-center justify-center"
        >
          <ArrowLeft2 size={24} color={colors.primary} />
        </TouchableOpacity>

        <FormPainSymptoms ref={formRef} />
      </View>
    </SafeAreaView>
  );
}
