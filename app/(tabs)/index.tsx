import { Text, View, SafeAreaView } from "react-native";
import FormPainSymptoms from "../../components/FormPainSymptoms";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 w-full h-full p-6">
          <Text className="text-black font-bold text-lg">NativeWind</Text>

          <FormPainSymptoms />
        </View>

    </SafeAreaView>
  );
};
