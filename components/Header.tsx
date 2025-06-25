import React from 'react';
import { Image, ImageBackground, StatusBar, Text, View } from 'react-native';

interface HeaderProps {
  name: string;
  profileImage?: string;
}

export function Header({ 
  name = "Gustavo S.", 
  profileImage,
}: HeaderProps) {
  const getInitials = (fullName: string): string => {
    return fullName
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  const renderProfileContent = () => {
    if (profileImage) {
      return (
        <Image
          source={{ uri: profileImage }}
          className="w-full h-full rounded-full"
          style={{ resizeMode: 'cover' }}
        />
      );
    }
    
    return (
      <View className="w-full h-full rounded-full bg-gray-300 justify-center items-center">
        <Text className="text-gray-600 text-3xl font-bold">
          {getInitials(name)}
        </Text>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#22c55e" />
      <ImageBackground 
        source={require('../assets/images/banner-header.png')}
        className="pt-12 pb-8 px-4"
      >
        <View className="items-center">
          <View className="w-32 h-32 rounded-full bg-white p-1 mb-4 shadow-lg">
            {renderProfileContent()}
          </View>
          <Text className="text-black text-2xl font-medium">{name}</Text>
        </View>
      </ImageBackground>
    </>
  );
};

export default Header;