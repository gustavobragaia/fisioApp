import colors from "@/styles/colors";
import { Home } from "lucide-react-native";
import { Dimensions, FlatList, Text, View } from "react-native";

export const HorizontalCardSection = ({ 
  title, 
  data = Array.from({ length: 10 }) 
}: { 
  title: string; 
  data?: any[]; 
}) => {
  const { width } = Dimensions.get("window");
  const cardWidth = (width - 60) / 3;

  return (
    <View className="mt-6">
      <Text className="mx-6 font-semibold text-textPrimary text-xl mb-4">
        {title}
      </Text>
      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          alignItems: "center",
          gap: 8,
        }}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={120}
        renderItem={(index) => (
          <View
            key={Number(index)}
            className="p-4 bg-white shadow-[0_3px_30px_rgba(16,16,16,0.03)] rounded-xl"
            style={{ width: cardWidth }}
          >
            <Home size={24} color={colors.primary} />
            <Text className="font-semibold text-base text-textPrimary mt-4">
              Ansiedade e cansaço
            </Text>
          </View>
        )}
      />
    </View>
  );
};