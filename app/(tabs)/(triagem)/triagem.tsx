import { Text, View, SafeAreaView, Image } from "react-native";
import { router } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import colors from "../../../styles/colors";
import TriageOption from "../../../components/TriageOption";
import ProfileAvatar from "../../../components/ProfileAvatar";

export default function Triagem() {
  const handlePainOptionPress = () => {
    // Using the correct navigation format for nested routes
    router.push({
      pathname: "/(tabs)/(triagem)/(pain)"
    });
  };

  const handleMentalHealthOptionPress = () => {
    // Using the correct navigation format for nested routes
    router.push({
      pathname: "/(tabs)/(triagem)/(mental)"
    });
  };

  const handleExploreApp = () => {
    // Navigate to the home tab
    router.push({
      pathname: "/(tabs)"
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 w-full h-full p-5">
        {/* Header with logo and profile */}

        {/* Main content */}
        <View className="mt-5">
          <Text className="text-4xl font-bold text-slate-700 mb-8">Como podemos{"\n"}te ajudar agora?</Text>
          
          {/* Triage options */}
          <TriageOption 
            title="Estou com dor no corpo"
            backgroundColor="#FF8E7F"
            icon={<Feather name="activity" size={32} color="white" />}
            onPress={handlePainOptionPress}
          />
          
          <TriageOption 
            title="Estou ansioso, estressado o não dormi bem"
            backgroundColor="#8E9BFF"
            icon={<Ionicons name="cloud" size={32} color="white" />}
            onPress={handleMentalHealthOptionPress}
          />
        </View>

        {/* Explore app button */}
        <View className="mt-10">
          <Text 
            className="text-xl font-medium text-center text-slate-700 p-4"
            onPress={handleExploreApp}
          >
            Explorar o app
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
