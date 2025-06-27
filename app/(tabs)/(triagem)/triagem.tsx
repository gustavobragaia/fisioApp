import { Button } from "@/components/Button";
import colors from "@/styles/colors";
import { router } from "expo-router";
import { EmojiSad, HeartSearch } from "iconsax-react-native";
import { SafeAreaView, Text, View } from "react-native";
import { TriageOption } from "../../../components/TriageOption";

export default function Triagem() {
  const handlePainOptionPress = () => {
    // Using the correct navigation format for nested routes
    router.push({
      pathname: "/(tabs)/(triagem)/(pain)",
    });
  };

  const handleMentalHealthOptionPress = () => {
    // Using the correct navigation format for nested routes
    router.push({
      pathname: "/(tabs)/(triagem)/(mental)",
    });
  };

  const handleExploreApp = () => {
    // Navigate to the home tab
    router.push({
      pathname: "/(tabs)",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 w-full h-full px-6 py-8">
        <View className="mt-5">
          <Text className="text-4xl font-bold text-white mb-8">
            Como podemos{"\n"}te ajudar agora?
          </Text>

          <TriageOption
            title="Estou com dor no corpo"
            icon={<HeartSearch size={32} color={colors.primary} />}
            onPress={handlePainOptionPress}
          />

          <TriageOption
            title="Estou ansioso, estressado o não dormi bem"
            icon={<EmojiSad size={32} color={colors.primary} />}
            onPress={handleMentalHealthOptionPress}
          />
        </View>

        <Button
          title="Explorar o app"
          onPress={handleExploreApp}
          variant="secondary"
        />
      </View>
    </SafeAreaView>
  );
}
