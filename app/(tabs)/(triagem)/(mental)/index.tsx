import { router, useFocusEffect } from "expo-router";
import { ArrowLeft2 } from "iconsax-react-native";
import React, { useRef } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View
} from "react-native";
import FormMentalHealth, {
  FormMentalHealthRefType,
} from "../../../../components/FormMentalHealth";
import colors from "../../../../styles/colors";

export default function MentalHealthTriagePage() {
  const formRef = useRef<FormMentalHealthRefType>(null);

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

        <FormMentalHealth ref={formRef} />
      </View>
    </SafeAreaView>
  );
}
