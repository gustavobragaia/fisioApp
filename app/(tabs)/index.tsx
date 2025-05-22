import { Text, View, SafeAreaView } from "react-native";


export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 items-center justify-center p-4">
        <View className="w-40 h-40 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
          <Text className="text-black font-bold text-lg">NativeWind</Text>
        </View>

      </View>
    </SafeAreaView>
  );
}
