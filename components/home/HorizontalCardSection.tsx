import { useRouter } from "expo-router";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
import { OptionCard } from "../OptionCard";

export const HorizontalCardSection = ({
  title,
  type,
  data = Array.from({ length: 10 }),
}: {
  title: string;
  type: string;
  data: {
    label: string;
    value: string;
    imageSource: {
      uri: string;
    };
  }[];
}) => {
  const { width } = Dimensions.get("window");
  const cardWidth = (width - 60) / 3;

  const router = useRouter();

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
            key={Number(data.item.label)}
            icon={
              <Image
                source={data.item.imageSource}
                width={24}
                height={24}
                alt={data.item.label}
              />
            }
            title={data.item.label}
            cardWidth={cardWidth}
            onPress={() => {
              router.push({
                pathname:
                  type === "mental"
                    ? "/(tabs)/(triagem)/(mental)"
                    : "/(tabs)/(triagem)/(pain)",
                params: {
                  preSelectedQuestion: data.item.value
                },
              });
            }}
          />
        )}
      />
    </View>
  );
};
