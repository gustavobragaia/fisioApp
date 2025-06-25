import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';

interface HeaderProps {
  name: string;
  profileImage?: string;
}

export function Header({ 
  name = "Gustavo S.", 
  profileImage,
}: HeaderProps) {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView className='bg-primary rounded-b-3xl'>
        <View className="p-6">
          <Text className='text-4xl font-bold text-white'>Bem-vindo de volta,</Text>
          <Text className='text-3xl font-bold text-white'>Gustavo 👋</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Header;