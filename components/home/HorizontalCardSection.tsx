import { ReactNode } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";

export const HorizontalCardSection = ({ 
  title, 
  data = Array.from({ length: 10 }) 
}: { 
  title: string; 
  data: {
    icon: ReactNode
    title: string
  }[]; 
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
        renderItem={(data) => (
          <View
            key={Number(data.item.title)}
            className="h-[108px] p-4 bg-white shadow-[0_3px_30px_rgba(16,16,16,0.03)] rounded-xl justify-between"
            style={{ width: cardWidth }}
          >
            {data.item.icon}
            <Text className="font-semibold text-base text-textPrimary mt-4 line-clamp-2">
              {data.item.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
};