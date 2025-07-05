import React from "react";
import { Image, ImageBackground, SafeAreaView, Text, View } from "react-native";

interface HeaderProps {
  name: string;
  profileImage?: string;
}

export function ProfileHeader({
  name = "Gustavo S.",
  profileImage,
}: HeaderProps) {
  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  return (
    <>
      <SafeAreaView className="bg-primary overflow-hidden h-36">
        <ImageBackground
          source={require("@/assets/images/banner-background.png")}
          style={{ flex: 1 }}
          resizeMode="cover"
        />
      </SafeAreaView>
      <View className="mt-[-32px] items-center">
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            className="w-20 h-20 rounded-full"
          />
        ) : (
          <View className="w-20 h-20 rounded-full bg-[#8D90A1] items-center justify-center">
            <Text className="text-2xl font-bold text-white">
              {getInitials(name)}
            </Text>
          </View>
        )}
        <Text className="text-2xl font-bold text-textPrimary mt-2">{name}</Text>
      </View>
    </>
  );
}
