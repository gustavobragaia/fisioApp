import { ReactNode } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { OptionCard } from "../OptionCard";

export const HorizontalCardSection = ({
  title,
  data = Array.from({ length: 10 }),
}: {
  title: string;
  data: {
    icon: ReactNode;
    title: string;
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
          <OptionCard
            key={Number(data.item.title)}
            icon={data.item.icon}
            title={data.item.title}
            cardWidth={cardWidth}
          />
        )}
      />
    </View>
  );
};
