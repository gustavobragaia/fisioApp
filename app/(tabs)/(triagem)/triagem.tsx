import { Text, View, SafeAreaView, ScrollView } from "react-native";
import FormPainSymptoms from "../../../components/FormPainSymptoms";

export default function Triagem() {
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <View className="flex-1 w-full h-full p-0">

            <FormPainSymptoms />
        </View>

    </SafeAreaView>
  );
};
