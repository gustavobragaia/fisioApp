import colors from "@/styles/colors";
import { router } from "expo-router";
import { EmojiSad } from "iconsax-react-native";
import { ImageBackground, SafeAreaView, Text, View } from "react-native";
import { TriageOption } from "../../../components/TriageOption";

export default function Triagem() {
  const handleMentalHealthOptionPress = () => {
    router.push({
      pathname: "/(tabs)/(triagem)/(mental)",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ImageBackground
        source={require("@/assets/images/banner-background.png")}
        style={{ flex: 1 }}
        resizeMode="stretch"
      >
        <View className="absolute inset-0 bg-primary/60" />

        <View className="flex-1 w-full h-full px-6 py-8 relative z-10">
          <View className="mt-20">
            <Text className="text-4xl font-bold text-white mb-8">
              Como podemos te ajudar agora?
            </Text>

            <TriageOption
              title="Estou ansioso, estressado o não dormi bem"
              icon={<EmojiSad size={32} color={colors.primary} />}
              onPress={handleMentalHealthOptionPress}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
